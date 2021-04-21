import { IStorage } from "./IStorage";
import { Recipe } from "../model/Recipe";

/**
 * Persistenza dei boomark nel localstorage
 */
export class LocalStorage implements IStorage {
    /**
     * Chiave entru nel local storage
     */
    private readonly bookmarksKey = "bookmarks";

    /**
     * Salva i bookmark nello storage
     * @param recipes bookmarks (ricette)
     */
    public async persistBookmarks(recipes: Recipe[]): Promise<void> {
        localStorage.setItem(this.bookmarksKey, JSON.stringify(recipes));
    }

    /**
     * Carica i bookmark dallo storage
     */
    public async loadBookmarks(): Promise<Recipe[]> {
        let recipes: Recipe[] = [];
        const bookmarks = localStorage.getItem(this.bookmarksKey);

        //ho trovato dei bookmark
        if (bookmarks !== null) {
            recipes = <Recipe[]>JSON.parse(bookmarks);
        }

        return Promise.resolve(recipes);
    }
}
