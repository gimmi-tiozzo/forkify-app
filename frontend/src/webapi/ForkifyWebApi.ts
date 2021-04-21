import { BaseWebApi } from "./BaseWebApi";
import { ForkifyGetRecipeResponse, ForkifyGetAllRecipeResponse } from "../model/ForkifyResponse";
import { Logger } from "../common/Logger";
import { Recipe } from "../model/Recipe";
import { IForkifyWebApi } from "./IForkifyWebApi";

/**
 * Forkify API v2
 */
export class ForkifyWebApi extends BaseWebApi implements IForkifyWebApi {
    /**
     * Costruttore di default
     */
    constructor() {
        super();
    }

    /**
     * Ottieni la lista di tutte le ricette
     * @param search stringa (ricetta) da ricercare
     */
    public async getAllRecipes(search: string): Promise<ForkifyGetAllRecipeResponse> {
        try {
            return (await this.callGetApi("recipes", `&search=${search}`)) as ForkifyGetAllRecipeResponse;
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    }

    /**
     * Ricerca una singola ricetta
     * @param id id ricetta
     * @returns Singola ricetta
     */
    public async getRecipe(id: string): Promise<ForkifyGetRecipeResponse> {
        try {
            return <ForkifyGetRecipeResponse>await this.callGetApi(`recipes/${id}`);
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    }

    /**
     * Crea una nuova ricetta
     * @param recipe ricetta
     * @returns ricetta appena creata
     */
    public async createNewRecipe(recipe: Recipe): Promise<ForkifyGetRecipeResponse> {
        try {
            return <ForkifyGetRecipeResponse>await this.callPostApi(`recipes`, recipe);
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    }
}
