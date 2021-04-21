import { BaseView } from "./BaseView";
import { AutoBind } from "../decorators/AutoBind";

/**
 * Vista per aggiungere una nuova ricetta
 */
export class AddRecipeView extends BaseView<HTMLFormElement> {
    /**
     * Overlay di sfondo nel caso di modale
     */
    private overlay: HTMLDivElement;

    /**
     * Finestra di popup
     */
    private popup: HTMLDivElement;

    /**
     * Bottone di chiusura della modale
     */
    private closeButton: HTMLButtonElement;

    /**
     * Bottone per aprire la modale per lìupload di una nuova ricetta
     */
    private addRecipeButton: HTMLButtonElement;

    /**
     * Costruttore
     */
    constructor() {
        super(".upload");

        this.overlay = document.querySelector(".overlay")!;
        this.overlay.addEventListener("click", this.toggleHidden);

        this.closeButton = document.querySelector(".btn--close-modal")!;
        this.closeButton.addEventListener("click", this.toggleHidden);

        this.addRecipeButton = document.querySelector(".nav__btn--add-recipe")!;
        this.addRecipeButton.addEventListener("click", this.refresh);

        this.popup = document.querySelector(".add-recipe-window")!;
    }

    /**
     * Aggiungi o rimuovi le classi hidden per visualizzare o meno il popup
     *
     */
    @AutoBind
    public toggleHidden() {
        this.overlay.classList.toggle("hidden");
        this.popup.classList.toggle("hidden");
    }

    /**
     * Esegui un refresh della vista
     */
    @AutoBind
    private refresh() {
        this.toggleHidden();
        super.render({});
    }

    /**
     * Crea il markup della vista
     * @param data dati da cui creare il markup
     */
    protected generateMarkup(data: any): string[] {
        let markup: string[] = [];

        markup.push(`<div class="upload__column">
                        <h3 class="upload__heading">Recipe data</h3>
                        <label>Title</label>
                        <input value="TEST" required name="title" type="text" />
                        <label>URL</label>
                        <input value="TEST" required name="sourceUrl" type="text" />
                        <label>Image URL</label>
                        <input value="TEST" required name="image" type="text" />
                        <label>Publisher</label>
                        <input value="TEST" required name="publisher" type="text" />
                        <label>Prep time</label>
                        <input value="23" required name="cookingTime" type="number" />
                        <label>Servings</label>
                        <input value="23" required name="servings" type="number" />
                     </div>
                     <div class="upload__column">
                        <h3 class="upload__heading">Ingredients</h3>
                        <label>Ingredient 1</label>
                        <input value="0.5,kg,Rice" type="text" required name="ingredient-1" placeholder="Format: 'Quantity,Unit,Description'" />
                        <label>Ingredient 2</label>
                        <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                        <label>Ingredient 3</label>
                        <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
                        <label>Ingredient 4</label>
                        <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                        <label>Ingredient 5</label>
                        <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                        <label>Ingredient 6</label>
                        <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
                     </div>

                     <button class="btn upload__btn">
                        <svg>
                            <use href="img/icons.svg#icon-upload-cloud"></use>
                        </svg>
                        <span>Upload</span>
                     </button>`);

        return markup;
    }

    /**
     * Aggiungi un handle per gestire l'evento di submit di caricamento di una ricetta
     * @param handler handler per il caricamento dei una ricetta
     */
    public addUploadHandler(handler: (recipe: any) => void) {
        this.parent.addEventListener("submit", function (ev: Event) {
            ev.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            handler(data);
        });
    }
}

export default new AddRecipeView();
