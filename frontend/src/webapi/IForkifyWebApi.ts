import { ForkifyGetAllRecipeResponse, ForkifyGetRecipeResponse } from "../model/ForkifyResponse";
import { Recipe } from "../model/Recipe";

/**
 * Forkify API v2
 */
export interface IForkifyWebApi {
    /**
     * Ottieni la lista di tutte le ricette
     * @param search stringa (ricetta) da ricercare
     */
    getAllRecipes(search: string): Promise<ForkifyGetAllRecipeResponse>;

    /**
     * Ricerca una singola ricetta
     * @param id id ricetta
     * @returns Singola ricetta
     */
    getRecipe(id: string): Promise<ForkifyGetRecipeResponse>;

    /**
     * Crea una nuova ricetta
     * @param recipe ricetta
     * @returns ricetta appena creata
     */
    createNewRecipe: (recipe: Recipe) => Promise<ForkifyGetRecipeResponse>;
}
