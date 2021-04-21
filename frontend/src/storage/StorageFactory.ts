import { IStorage } from "./IStorage";
import { LocalStorage } from "./LocalStorage";
import { IndexDbStorage } from "./IndexDbStorage";
import { STORAGE_TYPE } from "../common/Config";
import { StorageType } from "./StorageType";

/**
 * Factory per la creazione di uno storage
 */
export class StorageFactory {
    /**
     * Ottieni lo storage per la persistenza dei dati
     * @returns Storage per la persistenza dei dati
     */
    public static getStorage(): IStorage {
        switch (STORAGE_TYPE) {
            case StorageType.Local:
                return new LocalStorage();
            case StorageType.Index:
                return new IndexDbStorage();
            default:
                throw new Error(`Storage non supportato: ${STORAGE_TYPE[StorageType.Local]}`);
        }
    }
}
