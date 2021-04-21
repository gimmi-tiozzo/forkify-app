import searchResView from "../views/SearchResultsView";
import resultView from "../views/ResultView";
import paginationView from "../views/PaginationView";
import { BaseController } from "./BaseController";
import applicationState from "../model/ForkifyState";

/**
 * Controller per la gestione delle funzioni di ricerca
 */
export class SearchController extends BaseController {
    /**
     * Registra il controller nelle view per cui devono essere gestiti gli eventi
     */
    public registerViewHandler(): void {
        searchResView.addHandlerSearch(this.controlSearchResult);
        paginationView.addHandlerSearch(this.controlPagination);
    }

    /**
     * Visualizza una pagina dei risultati di ricerca
     * @param goToPage numero di pagina
     */
    public controlPagination(goToPage: number) {
        try {
            //1. filtra la ricerca per la pagina richiesta
            const searchResult = applicationState.getSearchResultPage(goToPage);

            //2. riaggiorna la vista dei risultati di ricerca
            resultView.render(searchResult);

            //3. riaggiorna la vista dei pulsanti di ricerca
            paginationView.render(applicationState.state.search);
        } catch (e) {
            resultView.rendereError(e.message);
        }
    }

    /**
     * Esegui una ricerca di di ricette in base al criterio di ricerca
     */
    public async controlSearchResult() {
        try {
            //1. ottieni la parola chiave di ricerca in mappa per la ricerca delle ricette
            resultView.renderSpinner();
            const query: string = searchResView.getSearchQuery();
            if (!query) {
                resultView.rendereError("Impostare un criterio di ricerca!!!");
                return;
            }

            //2. esegui la ricerca e aggiorna lo stato dell'applicativo
            await applicationState.loadSearchResult(query);

            //2. non ho trovato nessun risultato di ricerca
            const searchResult = applicationState.getSearchResultPage();
            if (searchResult.length === 0) {
                resultView.rendereError("Nessuna ricetta trovata con la ricerca");
                return;
            }

            //3. esegui il rendering dei risultati di ricerca
            resultView.render(searchResult);

            //4. aggiorna la vista di paginazione
            paginationView.render(applicationState.state.search);
        } catch (e) {
            resultView.rendereError(e.message);
        }
    }
}
