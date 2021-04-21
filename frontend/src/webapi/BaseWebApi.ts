import { AUTH_TOKEN, FORKIFY_WEBAPI_URL } from "../common/Config";
import { BaseForkifyResponse } from "../model/ForkifyResponse";
import { ApiStatusLevel } from "../common/StatusLevel";
import { timeout } from "../common/Utils";

/**
 * Classe che racoglie i meccanismi di base di comunicazione con le API di Forkify
 */
export class BaseWebApi {
    /**
     * Token di autenticazione per comunicare con le WebApi
     */
    private authToken: string;

    /**
     * Url di comunicazione con Forkify
     */
    private url: string;

    /**
     * Url di comunicazione con Forkify
     */
    protected get baseUrl(): string {
        return this.url;
    }

    /**
     *
     * @param webApi Ottien l'url di una API
     */
    protected buildWebApiUrl(webApi: string): string {
        return `${this.baseUrl}/${webApi}?key=${this.authToken}`;
    }

    /**
     * Lancia un errore se la risposta ha status applicativo divertso da success o un errore nella risposta della fetch
     * @param response risposta alla web api
     */
    protected async ThrowAnyError(response: BaseForkifyResponse | Response): Promise<void> {
        //check risposta dalla fetch
        if (response instanceof Response) {
            //estraggo gli eventuali dettagli dell'errore
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.message}-${data.status}`);
            }
        }

        //check per risposta applicativa dalla webapi
        if ("status" in response && "message" in response) {
            if (response.status !== ApiStatusLevel.Success) {
                throw new Error(response.message);
            }
        }
    }

    /**
     * Richiama in GET la webapi
     * @param uri uri api
     * @param queryString eventuale querystring
     */
    protected async callGetApi(uri: string, queryString?: string): Promise<any> {
        const apiUrl = this.buildWebApiUrl(uri);
        const fetchPromise = fetch(`${apiUrl}${queryString ? queryString : ""}`);
        const httpResponse = await Promise.race([timeout(), fetchPromise]);

        if (httpResponse instanceof Response) {
            //verifica lo stato della response dalla fetch
            await this.ThrowAnyError(httpResponse);
            //estrai la risposta applicativa
            const response = await httpResponse.json();
            //verifica lo stato applicativo della risposta
            await this.ThrowAnyError(response);

            return response;
        }

        throw new Error(`Non è stato possibile ottenere la risposta dalla fetch della webapi ${uri}`);
    }

    /**
     * Richiama in post la Webapi
     * @param uri uri api
     * @param jsonBody json object
     */
    protected async callPostApi(uri: string, jsonBody?: object): Promise<any> {
        const apiUrl = this.buildWebApiUrl(uri);
        const fetchPromise = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(jsonBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const httpResponse = await Promise.race([timeout(), fetchPromise]);

        if (httpResponse instanceof Response) {
            //verifica lo stato della response dalla fetch
            await this.ThrowAnyError(httpResponse);
            //estrai la risposta applicativa
            const response = await httpResponse.json();
            //verifica lo stato applicativo della risposta
            this.ThrowAnyError(response);

            return response;
        }

        throw new Error(`Non è stato possibile ottenere la risposta dalla fetch della webapi ${uri}`);
    }

    /**
     * Costruttore di default
     */
    constructor() {
        //il token può essere generato massimo una volta ogni ora
        this.authToken = AUTH_TOKEN;
        this.url = FORKIFY_WEBAPI_URL;
    }
}
