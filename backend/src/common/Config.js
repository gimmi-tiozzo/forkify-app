/**
 * Token di autenticazione per comunicare con le WebApi
 */
const AUTH_TOKEN = process.env.AUTH_TOKEN;

/**
 * Url per le Web Api di Forkify
 */
const FORKIFY_WEBAPI_URL = process.env.FORKIFY_WEBAPI;

/**
 * Url per API di autenticazione
 */
const AUTH_WEBAPI_URL = process.env.AUTH_URL;

exports.appSettings = {
    authToken: AUTH_TOKEN,
    authWebApiUrl: AUTH_WEBAPI_URL,
    forkifyWebApiUrl: FORKIFY_WEBAPI_URL,
};
