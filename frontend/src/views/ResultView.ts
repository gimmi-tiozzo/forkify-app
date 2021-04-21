import { BaseView } from "./BaseView";

/**
 * Vista per la visualizzazione delle ricete trovate tramite ricerca
 */
class ResultView extends BaseView<HTMLUListElement> {
    /**
     * Costruttore
     */
    constructor() {
        super(".results");
    }

    /**
     * Esegui il rendering della paginazione dei risultati di ricerca
     * @param data Stato della ricerca
     */
    protected generateMarkup(data: any): string[] {
        let markup: string[] = [];
        const currentId = window.location.hash.slice(1);

        if (Array.isArray(data)) {
            data.forEach((recipe) => {
                markup.push(`<li class="preview">
                                <a class="preview__link ${recipe.id === currentId ? "preview__link--active" : ""}" href="#${recipe.id}">
                                <figure class="preview__fig">
                                    <img src="${recipe.image_url}" alt="${recipe.title}" />
                                </figure>
                                <div class="preview__data">
                                    <h4 class="preview__title">${recipe.title}</h4>
                                    <p class="preview__publisher">${recipe.publisher}</p>
                                    <div class="preview__user-generated ${recipe.key ? "" : "hidden"}">
                                    <svg>
                                        <use href="img/icons.svg#icon-user"></use>
                                    </svg>
                                    </div>
                                </div>
                                </a>
                             </li>`);
            });
        }

        return markup;
    }
}

export default new ResultView();
