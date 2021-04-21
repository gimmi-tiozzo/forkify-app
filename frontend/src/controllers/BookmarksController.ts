import { BaseController } from "./BaseController";
import bookmarksView from "../views/BookmarksView";
import applicationState from "../model/ForkifyState";

export class BookmarksController extends BaseController {
    /**
     * Registra il controller nelle view per cui devono essere gestiti gli eventi
     */
    public registerViewHandler(): void {
        bookmarksView.addButtonHandler(this.controlBookmarks);
    }

    /**
     * Carica i bookmarks salvati a sistema
     */
    public controlBookmarks() {
        bookmarksView.render(applicationState.state.bookmarks);
    }
}
