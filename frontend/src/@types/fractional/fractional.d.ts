/**
 * Dichiarazione d.ts per la libreria javascript fractional
 */
declare module "fractional" {
    export class Fraction {
        /**
         * quantità che deve essere trasformata in frazione
         * @param q quantità
         */
        constructor(q: number);

        /**
         * Ottieni la versione stringa della frazione
         */
        public toString(): string;
    }
}
