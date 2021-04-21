import { LogLevel } from "./LogLevel";

/**
 * Classe per il logging
 */
export class Logger {
    /**
     * Livello di log impostato nel logger
     */
    private static logLevel: LogLevel = LogLevel.Error;

    /**
     * Log info
     * @param message messaggio di log
     */
    public static info(message: string): void {
        if (Logger.logLevel === LogLevel.Info) {
            console.log(message);
        }
    }

    /**
     * Log error
     * @param message messaggio di log
     */
    public static warning(message: string): void {
        if (Logger.logLevel === LogLevel.Info || Logger.logLevel === LogLevel.Warning) {
            console.warn(message);
        }
    }

    /**
     * Log error
     * @param message messaggio di log
     */
    public static error(message: string): void {
        if (Logger.logLevel === LogLevel.Info || Logger.logLevel === LogLevel.Warning || Logger.logLevel === LogLevel.Error) {
            console.error(message);
        }
    }
}
