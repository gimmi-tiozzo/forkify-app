import { BaseView } from "./BaseView";

/**
 * Vista per la gestione della paginazione
 */
class PaginationView extends BaseView<HTMLDivElement> {
    /**
     * Costruttore di default
     */
    constructor() {
        super(".pagination");
    }

    /**
     * Esegui il rendering della paginazione dei risultati di ricerca
     * @param data Stato della ricerca
     */
    protected generateMarkup(data: any): string[] {
        const currPage = data.page;
        const pageSize = data.resultPerPages;
        const results = data.result.length;
        const numPages = Math.ceil(results / pageSize);
        let markup: string[] = [];

        //sono all'ultima pagina e c'è una pagina precedente
        if (currPage === numPages && numPages > 1) {
            markup.push(`<button class="btn--inline pagination__btn--prev" data-goto="${currPage - 1}">
                            <svg class="search__icon">
                            <use href="img/icons.svg#icon-arrow-left"></use>
                            </svg>
                            <span>${currPage - 1}</span>
                          </button>`);
        }

        //solo alla prima pagina e c'è una pagina seguente
        if (currPage === 1 && numPages > 1) {
            markup.push(`<button class="btn--inline pagination__btn--next" data-goto="${currPage + 1}">
                            <span>${currPage + 1}</span>
                            <svg class="search__icon">
                            <use href="img/icons.svg#icon-arrow-right"></use>
                            </svg>
                         </button>`);
        }

        //sono un una pagina successiva alla prima e ci sono pagina successive
        if (currPage > 1 && currPage < numPages) {
            markup.push(`<button class="btn--inline pagination__btn--prev" data-goto="${currPage - 1}">
                            <svg class="search__icon">
                            <use href="img/icons.svg#icon-arrow-left"></use>
                            </svg>
                            <span>${currPage - 1}</span>
                         </button>
                         <button class="btn--inline pagination__btn--next" data-goto="${currPage + 1}">
                            <span>${currPage + 1}</span>
                            <svg class="search__icon">
                            <use href="img/icons.svg#icon-arrow-right"></use>
                            </svg>
                         </button>`);
        }

        //non ci sono risultati paginati. Resetto la paginazione con un markup vuoto
        if (currPage === 1 && numPages === 1) {
            markup.push("");
        }

        return markup;
    }

    /**
     * Registra gestore evento
     * @param handler handler evento
     */
    public addHandlerSearch(handler: (page: number) => void) {
        this.parent.addEventListener("click", function (e: MouseEvent) {
            //verifica che l'evento sia partito da un elemento button
            const el = (<HTMLElement>e.target).closest(".btn--inline");

            if (!el) return;

            handler(Number((<HTMLButtonElement>el).dataset.goto));
        });
    }
}

export default new PaginationView();
