import { IStorage } from "./IStorage";
import { Recipe } from "../model/Recipe";

/**
 * Tipo di dato IDBDatabase che permette di gestire i null
 */
type INullableDb<T> = T | null;

/**
 * Persistenza dei boomark tramite IndexDb
 */
export class IndexDbStorage implements IStorage {
    /**
     * Riferimento al DB Index in cui sono salvati i dati delle ricette
     */
    private _indexDb: INullableDb<IDBDatabase>;

    /**
     * Imposta l'istanza di IndexDb
     * @param db istanza di IndexDb
     */
    private set indexDb(db: INullableDb<IDBDatabase>) {
        this._indexDb = db;
    }

    /**
     * Ottieni l'istanza di IndexDb
     * @returns istanza di IndexDb
     */
    private get indexDb(): INullableDb<IDBDatabase> {
        return this._indexDb;
    }

    /**
     * costruttore di default
     */
    constructor() {
        this._indexDb = null;
    }

    /**
     * Crea o ottieni index db relativo ai bookmarks
     * @returns Promise con l'eventuale riferimento ad IndexDb
     */
    private async retrieveDatabase(): Promise<unknown> {
        /**
         * Se il DB non è ancora stato definito, allora crealo
         */
        if (this.indexDb === null) {
            return new Promise((resolve, reject) => {
                //avvia una richiesta di creazione DB
                const request: IDBOpenDBRequest = indexedDB.open("bookmarks", 1);

                //alla prima richiesta in assoluto il DB ha versione 0 per cui deve essere creato
                request.onupgradeneeded = function (ev: IDBVersionChangeEvent) {
                    const db = this.result;
                    if (!db.objectStoreNames.contains("recipes")) {
                        db.createObjectStore("recipes", { keyPath: "id" });
                    }
                };

                //ottieni il DB
                request.onsuccess = function (ev: Event) {
                    resolve(request.result);
                };

                //notifica l'errore se non si riesce a collegarsi al DB
                request.onerror = function (ev: Event) {
                    reject(request.error);
                };
            });
        }
    }

    /**
     * Inizializza indexdb
     */
    private async setupDatabase() {
        const db = await this.retrieveDatabase();

        if (db instanceof IDBDatabase) {
            this.indexDb = db;
        }
    }

    /**
     * Salva le ricette nell'indexdb
     * @param recipes ricette da salvare
     */
    private async saveRecipes(recipes: Recipe[]): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.indexDb) {
                const transaction = this.indexDb.transaction("recipes", "readwrite")!;
                const objStore = transaction.objectStore("recipes");

                //pulisci objectostore
                objStore.clear();

                //inserisci tutte le ricette
                for (const recipe of recipes) {
                    objStore.put(recipe);
                }

                transaction.oncomplete = function (ev: Event) {
                    resolve(undefined);
                };

                transaction.onerror = function (ev: Event) {
                    reject(transaction.error);
                };
            }
        });
    }

    /**
     * Ottieni le ricette salvate nello storage locale
     */
    private async getRecipes(): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            if (this.indexDb) {
                const transaction = this.indexDb.transaction("recipes", "readwrite")!;
                const objStore = transaction.objectStore("recipes");
                const request = objStore.getAll();

                request.onsuccess = function (ev: Event) {
                    resolve(request.result);
                };

                transaction.onerror = function (ev: Event) {
                    reject(transaction.error);
                };
            }
        });
    }

    /**
     * Salva i bookmark nello storage
     * @param recipes bookmarks (ricette)
     */
    public async persistBookmarks(recipes: Recipe[]): Promise<void> {
        await this.setupDatabase();
        await this.saveRecipes(recipes);
    }

    /**
     * Carica i bookmark dallo storage
     */
    public async loadBookmarks(): Promise<Recipe[]> {
        await this.setupDatabase();
        return await this.getRecipes();
    }
}
