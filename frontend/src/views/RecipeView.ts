import { Recipe } from "../model/Recipe";
import { Ingredient } from "../model/Ingredient";
import { BaseView } from "./BaseView";
import { Fraction } from "fractional";

/**
 * Vista per la visualizzazione di un dettaglio di una ricetta
 */
class RecipeView extends BaseView<HTMLDivElement> {
    /**
     * Costruttore di default
     */
    constructor() {
        super(".recipe");
    }

    /**
     * Registra gestore evento in caso di variazione hash nell'url della pagina
     * @param handler handler evento
     */
    public addLoadHandler(handler: (id: string) => void) {
        type eventType = "load" | "hashchange";
        const events: [a: eventType, b: eventType] = ["load", "hashchange"];

        events.forEach((evt) =>
            window.addEventListener(evt, function (_: Event | HashChangeEvent) {
                const hash = window.location.hash.slice(1);

                if (hash) {
                    handler(hash);
                }
            })
        );
    }

    /**
     * Gestione persistenza bookmark in storage locale
     * @param handler Registra gestore eventi per la persistenza della ricetta correntemente caricata come bookmark nello storage locale
     */
    public toggleBookmarkHandler(handler: () => void) {
        this.parent.addEventListener("click", function (ev: MouseEvent) {
            const addBoomarkButton = (ev.target as HTMLElement).closest(".btn--round");

            if (!addBoomarkButton) return;

            handler();
        });
    }

    /**
     * Aggiorna la lista delle porzioni
     * @param handler handler
     */
    public updateServingsHandler(handler: (servings: number) => void) {
        this.parent.addEventListener("click", function (ev: MouseEvent) {
            const servingsButton = (ev.target as HTMLElement).closest(".btn--tiny.btn--increase-servings");

            if (!servingsButton) return;

            const updateTo = +(<HTMLButtonElement>servingsButton).dataset.updateTo!;
            if (updateTo > 0) handler(updateTo);
        });
    }

    /**
     * Crea il markup della vista
     * @param data dati da cui creare il markup
     */
    protected generateMarkup(data: any): string[] {
        let markup: string[] = [];
        const recipe = data as Recipe;

        markup.push(`<figure class="recipe__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img" />
                        <h1 class="recipe__title">
                        <span>${recipe.title}</span>
                        </h1>
                     </figure>

                     <div class="recipe__details">
                     <div class="recipe__info">
                        <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
                        <span class="recipe__info-text">minutes</span>
                     </div>
                     <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                        <span class="recipe__info-text">servings</span>

                        <div class="recipe__info-buttons">
                            <button class="btn--tiny btn--increase-servings" data-update-to=${recipe.servings - 1}>
                                <svg>
                                <use href="img/icons.svg#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button class="btn--tiny btn--increase-servings" data-update-to=${recipe.servings + 1}>
                                <svg>
                                <use href="img/icons.svg#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>
                     </div>

                     <div class="recipe__user-generated ${recipe.key ? "" : "hidden"}">
                        <svg>
                        <use href="img/icons.svg#icon-user"></use>
                        </svg>
                     </div>
                     <button class="btn--round btn--bookmark">
                        <svg class="">
                            <use href="img/icons.svg#icon-bookmark${recipe.bookmark ? "-fill" : ""}"></use>
                        </svg>
                     </button>
                     </div>
                     <div class="recipe__ingredients">
                        <h2 class="heading--2">Recipe ingredients</h2>
                            <ul class="recipe__ingredient-list">
                                ${this.generateIngredientMarkup(recipe.ingredients ?? []).join("")}
                            </ul>
                     </div>
                     <div class="recipe__directions">
                        <h2 class="heading--2">How to cook it</h2>
                        <p class="recipe__directions-text">
                            This recipe was carefully designed and tested by
                            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
                            directions at their website.
                        </p>
                        <a
                            class="btn--small recipe__btn"
                            href="${recipe.source_url}"
                            target="_blank"
                        >
                            <span>Directions</span>
                            <svg class="search__icon">
                            <use href="img/icons.svg#icon-arrow-right"></use>
                            </svg>
                        </a>
                     </div>`);

        if (markup.length === 0) {
            markup.push(`<div class="message">
                            <div>
                                <svg>
                                    <use href="img/icons.svg#icon-smile"></use>
                                </svg>
                            </div>
                            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
                         </div>`);
        }

        return markup;
    }

    /**
     * Genera il markup per gli ingedienti di una ricetta
     */
    private generateIngredientMarkup(ingredients: Ingredient[]): string[] {
        let markup: string[] = [];

        ingredients.forEach((ingredient) =>
            markup.push(`<li class="recipe__ingredient">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ""}</div>
                            <div class="recipe__description">
                                <span class="recipe__unit">${ingredient.unit}</span>${ingredient.description}</div>
                        </li>`)
        );

        return markup;
    }
}

export default new RecipeView();
