import * as Controller from "./controllers/BaseController";
import { SearchController } from "./controllers/SearchController";
import { DetailController } from "./controllers/DetailController";
import { AddController } from "./controllers/AddRecipeController";
import { BookmarksController } from "./controllers/BookmarksController";

/**
 * Classe che rappresenta l'applicazione
 */
class App {
    /**
     * Controllers associati all'applicativo
     */
    private controller: Controller.BaseController[];

    /**
     * Costruttore di default
     */
    constructor() {
        this.controller = [];
        this.controller.push(new SearchController());
        this.controller.push(new DetailController());
        this.controller.push(new AddController());
        this.controller.push(new BookmarksController());
    }

    /**
     * Avvia i controller
     */
    public go(): void {
        this.controller.forEach((bc) => bc.registerViewHandler());
    }
}

const app = new App();
app.go();
