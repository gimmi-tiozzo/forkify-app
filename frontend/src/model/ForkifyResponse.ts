import { Recipe } from "./Recipe";

/**
 * Proprietà base di una risposta di una API Forkify
 */
export interface BaseForkifyResponse {
    /**
     * Stato risposta
     */
    status: string;

    /**
     * Eventuale messaggio di errore
     */
    message: string;
}

/**
 * Risposta dell'api di ricerca ricette
 */
export interface ForkifyGetAllRecipeResponse extends BaseForkifyResponse {
    /**
     * Numero risultati restituiti dalla ricerca
     */
    results: number;

    /**
     * Ricetta trovate con la ricerca
     */
    data: { recipes: Recipe[] };
}

/**
 * Risposta dell'api di ricerca singola ricetta
 */
export interface ForkifyGetRecipeResponse extends BaseForkifyResponse {
    /**
     * Ricetta
     */
    data?: { recipe: Recipe };
}
