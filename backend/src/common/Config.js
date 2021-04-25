/**
 * Token di autenticazione per comunicare con le WebApi
 */
const AUTH_TOKEN = "05a97d2a-f36d-4b7b-91d9-801cd3c0e963";

/**
 * Url per le Web Api di Forkify
 */
const FORKIFY_WEBAPI_URL = "https://forkify-api.herokuapp.com/api/v2";

/**
 * Url per API di autenticazione
 */
const AUTH_WEBAPI_URL = "http://localhost:8080/login";

exports.appSettings = {
    authToken: AUTH_TOKEN,
    authWebApiUrl: AUTH_WEBAPI_URL,
    forkifyWebApiUrl: FORKIFY_WEBAPI_URL,
};
