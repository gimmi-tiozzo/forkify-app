import { ForkifyWebApi } from "../webapi/ForkifyWebApi";
import { Recipe } from "./Recipe";
import { StateType } from "./StateType";
import { RESULT_PER_PAGE } from "../common/Config";
import { isValidUrl } from "../common/Utils";
import { StorageFactory } from "../storage/StorageFactory";
import { IStorage } from "../storage/IStorage";

/**
 * Stato dell'applicativo
 */
class ForkifyState {
    /**
     * Stato dell'applicativo
     */
    public state: StateType;

    /**
     * Costruttore
     */
    constructor() {
        this.state = {
            recipe: undefined,
            search: {
                result: [],
                query: "",
                page: 0,
                resultPerPages: RESULT_PER_PAGE,
            },
            bookmarks: [],
        };

        //caricamento asincrono delle ricette prelevate dallo storage locale
        StorageFactory.getStorage()
            .loadBookmarks()
            .then((recipes) => (this.state.bookmarks = recipes));
    }

    /**
     * Aggiorna il numero di porzioni della ricetta corrente
     * @param servings numero delle porzioni
     */
    public updateServings(servings: number) {
        this.state.recipe!.servings = servings;

        this.state.search.result.forEach((r) => {
            if (r.id === this.state.recipe!.id) {
                r.servings = servings;
            }
        });
    }

    /**
     * Carica una ricetta
     * @param id id della ricetta
     */
    public async loadRecipe(id: string) {
        const webApi = new ForkifyWebApi();
        const response = await webApi.getRecipe(id);

        this.state.recipe = response.data?.recipe;

        //agiorna eventualmente il bookmark
        if (this.state.bookmarks.some((r) => r.id === this.state.recipe?.id)) {
            this.state.recipe!.bookmark = true;
        }
    }

    /**
     * Esegui una ricerca delle ricette e salva lo stato
     * @param query query di ricerca
     */
    public async loadSearchResult(query: string) {
        const webApi = new ForkifyWebApi();
        const response = await webApi.getAllRecipes(query);

        this.state.search.query = query;
        this.state.search.page = 1;
        this.state.search.result = response.data.recipes;
    }

    /**
     * Carica una nuova ricetta
     * @param recipe ricetta
     */
    public async uploadRecipe(recipe: any) {
        //crea oggetto
        const recipeObj: Recipe = {
            cooking_time: +recipe.cookingTime,
            image_url: recipe.image,
            publisher: recipe.publisher,
            servings: +recipe.servings,
            source_url: recipe.sourceUrl,
            title: recipe.title,
            bookmark: !!recipe.bookmark,
            ingredients: Object.entries(recipe)
                .filter((entry) => entry[0].startsWith("ingredient") && entry[1])
                .map((entry) => {
                    const [quantity, unit, description] = (entry[1] as string).split(",").map((e) => e.trim());

                    return {
                        quantity: quantity ? +quantity : null,
                        unit: unit,
                        description: description,
                    };
                }),
        };

        if (!isValidUrl(recipeObj.image_url)) {
            throw new Error("'Image URL' non è URL valido");
        }

        if (!isValidUrl(recipeObj.source_url)) {
            throw new Error("'URL' non è URL valido");
        }

        if (recipeObj.cooking_time <= 0) {
            throw new Error("'Prep time' deve essere maggiore di zero");
        }

        if (recipeObj.servings <= 0) {
            throw new Error("'Servings' deve essere maggiore di zero");
        }

        if (recipeObj.ingredients === undefined || (recipeObj.ingredients !== undefined && recipeObj.ingredients.length < 3)) {
            throw new Error("Devono essere definiti almento 3 ingradienti");
        }

        //chiama webapi per caricarlo a back-end
        const webApi = new ForkifyWebApi();
        await webApi.createNewRecipe(recipeObj);

        //aggiona lo stato applicativo
        this.state.recipe = recipeObj;
    }

    /**
     * Ottieni le ricette ottenute dalla ricerca tramite webapi
     * @param goToPage numero di pagina dei risultati di ricerca da visualizzare
     */
    public getSearchResultPage(goToPage?: number): Recipe[] {
        const currPage = typeof goToPage === "number" ? goToPage : this.state.search.page;
        const pageSize = this.state.search.resultPerPages;
        const results = this.state.search.result.length;

        //calcola gli estermi di ricerca
        const start = (currPage - 1) * pageSize;
        const end = currPage * pageSize; //anche se si sfora la dimensione dell'array, lo slice non restituisce elementi undefined

        //aggiorna lo stato centralizzato
        this.state.search.page = currPage;
        //affetta i dati per la pagina di ricerca
        return this.state.search.result.slice(start, end);
    }

    /**
     * Gestisci la gestione della ricetta in termini di bookmark
     * @param recipe ricetta
     */
    public async handleBookmark(recipe: Recipe) {
        if (recipe.id == this.state.recipe?.id) {
            //se la ricetta non è persistita, allora viene persistita, altrimenti viene tolta
            if (!recipe.bookmark) {
                this.state.bookmarks.push(recipe);
                this.state.recipe!.bookmark = true;
            } else {
                const index = this.state.bookmarks.findIndex((r) => r.id === recipe.id);
                this.state.bookmarks.splice(index, 1);

                this.state.recipe!.bookmark = false;
            }

            //salva i bookmarks nello storage
            const storage: IStorage = StorageFactory.getStorage();
            await storage.persistBookmarks(this.state.bookmarks);
        }
    }
}

export default new ForkifyState();
