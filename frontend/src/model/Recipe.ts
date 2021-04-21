import { Ingredient } from "./Ingredient";

/**
 * Ricetta
 */
export interface Recipe {
    /**
     * publisher ricetta
     */
    publisher: string;
    /**
     * Url immagine ricetta
     */
    image_url: string;
    /**
     * Url ricetta
     */
    source_url: string;
    /**
     * Titolo ricetta
     */
    title: string;
    /**
     * Id ricetta
     */
    id?: String;
    /**
     * porzioni
     */
    servings: number;
    /**
     * Tempo di cottura
     */
    cooking_time: number;
    /**
     * Ingredienti
     */
    ingredients?: Ingredient[];
    /**
     * Indica se la ricerca è marcata (bookmark) perchè salvata nello storage locale
     */
    bookmark: boolean;

    /**
     * Chiave utente con cui è stata eventualmente generata la ricetta
     */
    key?: string;
}
