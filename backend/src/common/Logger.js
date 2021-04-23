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
 * Oggetto per il logging
 */
const Logger = {
    /**
     * Livello di log
     */
    logLevel: error,

    /**
     *  Log info
     * @param {string} message messaggio di log
     */
    info: function (message) {
        if (this.logLevel === info) {
            console.log(message);
        }
    },

    /**
     *  Log warning
     * @param {string} message messaggio di log
     */
    warning: function (message) {
        if (this.logLevel === info || this.logLevel === warning) {
            console.warn(message);
        }
    },

    /**
     *  Log error
     * @param {string} message messaggio di log
     */
    error: function (message) {
        if (this.logLevel === info || (this.logLevel === warning) | (this.logLevel === error)) {
            console.error(message);
        }
    },
};

exports.Trace = Logger;
