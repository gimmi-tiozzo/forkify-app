const fs = require("fs");
const path = require("path");

/**
 * livello di log error
 */
const error = 2;
/**
 * Livello di log warning
 */
const warning = 1;
/**
 * Livello di log info
 */
const info = 0;

/**
 * Path file di log
 */
const filePath = path.join(".", "logs", "log.txt");

/**
 * Oggetto per il logging
 */
const Logger = {
    /**
     * Livello di log
     */
    logLevel: info,

    /**
     *  Log info
     * @param {string} message messaggio di log
     */
    info: function (message) {
        if (this.logLevel === info) {
            console.log(message);
            traceFile(message, "INFO");
        }
    },

    /**
     *  Log warning
     * @param {string} message messaggio di log
     */
    warning: function (message) {
        if (this.logLevel === info || this.logLevel === warning) {
            console.warn(message);
            traceFile(message, "WARNING");
        }
    },

    /**
     *  Log error
     * @param {string} message messaggio di log
     */
    error: function (message) {
        if (this.logLevel === info || (this.logLevel === warning) | (this.logLevel === error)) {
            console.error(message);
            traceFile(message, "ERROR");
        }
    },
};

/**
 * Esegui la scrittura di un file nel filesystem
 * @param {string} message
 */
function traceFile(message, level) {
    const logRow = `${Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date())} - ${level}: ${message}\n`;

    fs.appendFile(filePath, logRow, (err) => {
        if (err) {
            throw err;
        }
    });
}

exports.Trace = Logger;
