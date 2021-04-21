import { StorageType } from "../storage/StorageType";
/**
 * Token di autenticazione per comunicare con le WebApi
 */
export const AUTH_TOKEN: string = "05a97d2a-f36d-4b7b-91d9-801cd3c0e963";

/**
 * Url per le Web Api di Forkify
 */
export const FORKIFY_WEBAPI_URL: string = "https://forkify-api.herokuapp.com/api/v2";

/**
 * Timeout chiamata web api
 */
export const TIMEOUT_SEC: number = 10;

/**
 * Risultati di ricerca per pagina
 */
export const RESULT_PER_PAGE = 10;

/**
 * Indica il tipo di storage da usare nella persistenza dei bookmark
 */
export const STORAGE_TYPE: StorageType = StorageType.Index;
