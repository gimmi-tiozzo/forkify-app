import { BaseView } from "./BaseView";
import { Recipe } from "../model/Recipe";

/**
 * Vista per la visualizzazione dei bookmark
 */
class BookmarksView extends BaseView<HTMLUListElement> {
    /**
     * Bottone per la navigazione dei bookmarks
     */
    private bookmarksButtom: HTMLButtonElement;

    /**
     * Costruttore di default
     */
    constructor() {
        super(".bookmarks__list");
        this.bookmarksButtom = document.querySelector(".nav__btn--bookmarks")!;
    }

    /**
     * Gestisci click su bottone bookmarks
     * @param handler handler evento
     */
    public addButtonHandler(handler: () => void) {
        this.bookmarksButtom.addEventListener("mouseenter", function (_: MouseEvent) {
            handler();
        });
    }

    /**
     * Crea il markup della vista
     * @param data dati da cui creare il markup
     */
    protected generateMarkup(data: any): string[] {
        const markup: string[] = [];
        const recipes = data as Recipe[];

        recipes.forEach(function (recipe) {
            markup.push(`<li class="preview">
                            <a class="preview__link" href="#${recipe.id}">
                            <figure class="preview__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}" />
                            </figure>
                            <div class="preview__data">
                                <h4 class="preview__name">
                                ${recipe.title}
                                </h4>
                                <p class="preview__publisher">${recipe.publisher}</p>
                            </div>
                            </a>
                         </li>`);
        });

        if (markup.length === 0) {
            markup.push(`<div class="message">
                            <div>
                                <svg>
                                    <use href="img/icons.svg#icon-smile"></use>
                                </svg>
                            </div>
                            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                         </div>`);
        }

        return markup;
    }
}

export default new BookmarksView();
