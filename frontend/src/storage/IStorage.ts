import { Recipe } from "../model/Recipe";

/**
 * API di storage
 */
export interface IStorage {
    /**
     * Salva i bookmark nello storage
     * @param recipes bookmarks (ricette)
     */
    persistBookmarks(recipes: Recipe[]): Promise<void>;

    /**
     * Carica i bookmark dallo storage
     */
    loadBookmarks(): Promise<Recipe[]>;
}
