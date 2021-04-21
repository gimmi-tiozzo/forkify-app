import { BaseController } from "./BaseController";
import resultView from "../views/ResultView";
import recipeView from "../views/RecipeView";
import bookmarksView from "../views/BookmarksView";
import applicationState from "../model/ForkifyState";

/**
 * Controller per la gestione del dettaglio di una ricetta
 */
export class DetailController extends BaseController {
    /**
     * Registra il controller nelle view per cui devono essere gestiti gli eventi
     */
    public registerViewHandler(): void {
        recipeView.addLoadHandler(this.controlRecipe);
        recipeView.toggleBookmarkHandler(this.controlToggleBookmark);
        recipeView.updateServingsHandler(this.controlServings);
    }

    /**
     * Carica una ricetta nella vista
     * @param id id ricetta
     */
    public async controlRecipe(id: string) {
        try {
            //1. carica nello stato la ricetta
            recipeView.renderSpinner();
            await applicationState.loadRecipe(id);

            //2. renderizza i risultati di ricerca in modo da avere la selezione della ricetta correntemente selezionata nel dettaglio
            resultView.render(applicationState.getSearchResultPage());

            //4.esegui il rendering del dettaglio della ricetta
            recipeView.render(applicationState.state.recipe);
        } catch (e) {
            recipeView.rendereError(e.message);
        }
    }

    /**
     * Gestisci la persistenza delle ricette nello storage locale (bookmarks)
     */
    public async controlToggleBookmark() {
        try {
            //1. Gestione della ricetta nello storage locale (tolta o inserita)
            await applicationState.handleBookmark(applicationState.state.recipe!);

            //2. Aggiorna la vista dei bookmarks
            bookmarksView.render(applicationState.state.bookmarks);

            //3.aggiorna la vista di dettaglio
            recipeView.render(applicationState.state.recipe);
        } catch (e) {
            recipeView.rendereError(e.message);
        }
    }

    /**
     * Aggiorna il numero di porzioni della ricetta corrente
     * @param servings numero porzioni
     */
    public controlServings(servings: number) {
        try {
            //1. Aggiorna il modello di stato
            applicationState.updateServings(servings);

            //2. Aggiorna la vista di dettaglio
            recipeView.render(applicationState.state.recipe);
        } catch (e) {
            recipeView.rendereError(e.message);
        }
    }
}
