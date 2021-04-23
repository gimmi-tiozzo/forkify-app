const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * Richiama una webapi
 * @param {string} url url con eventuale querystring
 * @param {string} verb verbo (GET|POST)
 * @param {*} data eventuali dati in post
 * @returns risposta json del servizio richiamato
 */
function HttpClient(url, verb, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(verb, url);
        let json;

        if (verb === "POST" && data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            json = JSON.stringify(data);
        }

        xhr.send(json);

        xhr.onload = function () {
            resolve({ status: xhr.status, json: xhr.responseText });
        };

        xhr.addEventListener("error", () => reject(new Error(`${xhr.status} - ${xhr.responseText}`)));
    });
}

exports.send = HttpClient;
