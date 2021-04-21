/**
 * Classe base per un costruttore
 */
export abstract class BaseController {
    /**
     * Registra il controller nelle view per cui devono essere gestiti gli eventi
     */
    public abstract registerViewHandler(): void;
}
