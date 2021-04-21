import { Recipe } from "./Recipe";

/**
 * Tipo che rappresenta lo stato di ricerca
 */
export type SearchRecipeStateType = {
    /**
     * Risultati della ricerca
     */
    result: Recipe[];
    /**
     * Query di ricerca
     */
    query: string;
    /**
     * Numero pagina dei risultati di ricerca correntemente visualizzata
     */
    page: number;
    /**
     * Risultati per pagina
     */
    resultPerPages: number;
};

/**
 * Tipo che rappresenta lo stato
 */
export type StateType = {
    /**
     * Ricetta correntemente caricata
     */
    recipe: Recipe | undefined;
    /**
     * Ricette trovate in ricerca
     */
    search: SearchRecipeStateType;

    /**
     * Bookmark salvati nel storage locale
     */
    bookmarks: Recipe[];
};
