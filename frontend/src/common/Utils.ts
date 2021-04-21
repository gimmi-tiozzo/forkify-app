import { TIMEOUT_SEC } from "./Config";

/**
 * Simula un timeout
 * @param seconds secondi di timeout
 * @returns Promise unknown. Non esiste il caso di resolve
 */
export function timeout(seconds: number = TIMEOUT_SEC): Promise<unknown> {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`La richiesta ha impiegato troppo tempo. Sono passati ${seconds} secondi`));
        }, seconds * 1000);
    });
}

/**
 * Verifica se si tratta di un url per protocollo http o https
 * @param url url da verificare
 * @returns true se si tratta di un url http o https, false altrimenti
 */
export function isValidUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch (_) {
        return false;
    }
}
