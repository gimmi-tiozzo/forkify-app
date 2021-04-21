import { BaseView } from "./BaseView";

/**
 * Vista per la ricerca delle ricette
 */
class SearchResultsView extends BaseView<HTMLButtonElement> {
    /**
     * Costruttore
     */
    constructor() {
        super(".search__btn");
    }

    /**
     * Registra gestore evento
     * @param handler handler evento
     */
    public addHandlerSearch(handler: () => void) {
        this.parent.addEventListener("click", function (e: MouseEvent) {
            e.preventDefault();
            handler();
        });
    }

    /**
     * Ottieni il valore da ricercare
     * @returns Valore da ricercare
     */
    public getSearchQuery(): string {
        const queryEl: HTMLInputElement = document.querySelector(".search__field")! as HTMLInputElement;
        const query = queryEl.value;
        this.clearInput(".search__field");
        return query;
    }

    /**
     * Crea il markup della vista
     * @param data dati da cui creare il markup
     */
    protected generateMarkup(data: any): string[] {
        return [];
    }
}

export default new SearchResultsView();
