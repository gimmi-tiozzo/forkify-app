import { BaseController } from "./BaseController";
import addRecipeView from "../views/AddRecipeView";
import recipeView from "../views/RecipeView";
import applicationState from "../model/ForkifyState";

/**
 * Controller per gestire l'inserimento di una nuova ricetta
 */
class AddRecipeController extends BaseController {
    /**
     * Registra il controller nelle view per cui devono essere gestiti gli eventi
     */
    public registerViewHandler(): void {
        addRecipeView.addUploadHandler(this.addRecipe);
    }

    /**
     * Aggiunti una ricetta
     * @param recipe ricetta
     */
    public async addRecipe(recipe: any) {
        try {
            //1. carica una nuova ricetta nel model
            addRecipeView.renderSpinner();
            await applicationState.uploadRecipe(recipe);

            //2. aggiorno la vista di dettaglio
            recipeView.render(applicationState.state.recipe);

            //3. cambio url
            window.history.pushState(null, "", `#${applicationState.state.recipe!.id}`);

            //4. chiudo popup
            addRecipeView.toggleHidden();
        } catch (e) {
            addRecipeView.rendereError(e.message);
        }
    }
}

export { AddRecipeController as AddController };
