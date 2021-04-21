/**
 * Classe base per le viste
 */
export abstract class BaseView<T extends HTMLElement> {
    /**
     * Elemento parent della vista
     */
    protected parent: T;

    /**
     * Costruttore
     * @param parentElName nome elemento padre (contenitore)
     */
    constructor(parentElName: string) {
        this.parent = document.querySelector(parentElName)! as T;
    }

    /**
     * Pulisci input
     */
    protected clearInput(elName: string) {
        const el: HTMLElement = document.querySelector(elName)! as HTMLElement;
        el.innerHTML = "";
    }

    /**
     * Pulisci contenuto elemento padre
     */
    public clear() {
        this.parent.innerHTML = "";
    }

    /**
     * Redenrizza un elemento spinner di attesa
     */
    public renderSpinner() {
        const markup = `<div class="spinner">
                            <svg>
                            <use href="img/icons.svg#icon-loader"></use>
                            </svg>
                        </div>`;

        this.clear();
        this.parent.insertAdjacentHTML("afterbegin", markup);
    }

    /**
     * Visualizza un messaggio
     * @param message messaggio
     */
    public rendereMessage(message: string) {
        const markup = `<div class="message">
                            <div>
                                <svg>
                                    <use href="img/icons.svg#icon-smile"></use>
                                </svg>
                            </div>
                            <p>${message}</p>
                        </div>`;

        this.clear();
        this.parent.insertAdjacentHTML("afterbegin", markup);
    }

    /**
     * Visualizza un messaggio di errore
     * @param message messaggio
     */
    public rendereError(message: string) {
        const markup = `<div class="message">
                            <div>
                                <svg>
                                    <use href="img/icons.svg#icon-alert-triangle"></use>
                                </svg>
                            </div>
                            <p>${message}</p>
                        </div>`;

        this.clear();
        this.parent.insertAdjacentHTML("afterbegin", markup);
    }

    /**
     * Esegui il rendering di una vista della pagina a partire dal suo elemento parent
     * @param data dati da cui creare il markup ed eseguire il rendering
     */
    public render(data: any) {
        //crea markup della vista
        const markup = this.generateMarkup(data);

        //esegui il rendering in pagina
        if (markup.length > 0) {
            this.clear();
            markup.forEach((m) => this.parent.insertAdjacentHTML("afterbegin", m));
        }
    }

    /**
     * Crea il markup della vista
     * @param data dati da cui creare il markup
     */
    protected abstract generateMarkup(data: any): string[];
}
