/**
 * Ingrediente ricetta
 */
export interface Ingredient {
    /**
     * quantità ingrediente
     */
    quantity: number | null;
    /**
     * unità quantità ingrediente
     */
    unit: string;
    /**
     * descrizione ingrediente
     */
    description: string;
}
