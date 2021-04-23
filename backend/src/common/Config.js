/**
 * Token di autenticazione per comunicare con le WebApi
 */
const AUTH_TOKEN = "05a97d2a-f36d-4b7b-91d9-801cd3c0e963";

/**
 * Url per le Web Api di Forkify
 */
const FORKIFY_WEBAPI_URL = "https://forkify-api.herokuapp.com/api/v2";

exports.appSettings = {
    authToken: AUTH_TOKEN,
    forkifyWebApiUrl: FORKIFY_WEBAPI_URL,
};
