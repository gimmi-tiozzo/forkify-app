const httpClient = require("./HttpPromiseClient");
const config = require("../common/Config");
const logger = require("../common/Logger");
const fetch = require("node-fetch");

/**
 * Classe base per una webapi
 * @param {string} url url servizio
 * @param {string} token token di autenticazione
 */
function BaseWebApi(url, token) {
    this.url = url;
    this.token = token;
    this.isAuth = false;
}

/**
 * Esegui una autenticazione basata su token
 * @returns true se l'autenticazione è andata a buon fine, false altrimenti
 */
BaseWebApi.prototype.checkToken = async function () {
    const response = await fetch(config.appSettings.authWebApiUrl, {
        method: "GET",
        headers: {
            Authorization: `barer ${this.token}`,
        },
    });

    let json = await response.json();
    json = json ?? "";

    if (!response.ok) {
        logger.Trace.error(`Autenticazione fallita. Status ${response.status} - ${JSON.stringify(json)} `);
    }

    if (json.status === "success") {
        return true;
    } else {
        logger.Trace.error(`Autenticazione fallita. Status ${response.status} - ${JSON.stringify(json)} `);
        return false;
    }
};

/**
 * Costruisci url base
 * @param {string} webApi nome webapi
 * @returns url base
 */
BaseWebApi.prototype.buildWebApiUrl = function (webApi) {
    return `${this.url}/${webApi}?key=${this.token}`;
};

/**
 * Richiama in GET la webapi
 * @param {string} uri uri api
 * @param {string} queryString eventuale querystring
 * @returns risposta json
 */
BaseWebApi.prototype.callGetApi = async function (uri, queryString) {
    //verifico l'autenticazione
    if (!this.isAuth) {
        this.isAuth = await this.checkToken();
    }

    const apiUrl = this.buildWebApiUrl(uri);
    const webApiurl = `${apiUrl}${queryString ? queryString : ""}`;

    return await httpClient.send(webApiurl, "GET");
};

/**
 * Richiama in POST la webapi
 * @param {string} uri uri webapi
 * @param {string} jsonBody json inviato con la POST
 * @returns risposta json
 */
BaseWebApi.prototype.callPostApi = async function (uri, jsonBody) {
    //verifico l'autenticazione
    if (!this.isAuth) {
        this.isAuth = await this.checkToken();
    }

    const webApiurl = this.buildWebApiUrl(uri);
    return await httpClient.send(webApiurl, "POST", jsonBody);
};

/**
 * Classe per le chiamate alle webapi di forkify
 * @param {string} token token di autenticazione
 */
function ForkifyWebApi(token) {
    BaseWebApi.call(this, config.appSettings.forkifyWebApiUrl, token ?? config.appSettings.authToken);
}

//crea un legame di ereditarietà
ForkifyWebApi.prototype = Object.create(BaseWebApi.prototype);

/**
 * Ottieni la lista delle ricette
 * @param {string} search querystring
 * @returns lista delle ricette
 */
ForkifyWebApi.prototype.getAllRecipes = async function (search) {
    try {
        return await this.callGetApi("recipes", `&search=${search}`);
    } catch (e) {
        logger.Trace.error(e);
        throw e;
    }
};

/**
 * Ottieni una singola ricetta
 * @param {string} id ide della ricetta
 * @returns ricetta
 */
ForkifyWebApi.prototype.getRecipe = async function (id) {
    try {
        return await this.callGetApi(`recipes/${id}`);
    } catch (e) {
        logger.Trace.error(e);
        throw e;
    }
};

/**
 * Crea una nuova ricetta
 * @param {Recipe} recipe
 */
ForkifyWebApi.prototype.createNewRecipe = async function (recipe) {
    try {
        return await this.callPostApi(`recipes`, recipe);
    } catch (e) {
        logger.Trace.error(e);
        throw e;
    }
};

exports.ForkifyWebApi = ForkifyWebApi;
