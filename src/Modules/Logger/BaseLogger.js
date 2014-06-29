'use strict';

var BaseLogger = function () {
};

BaseLogger.prototype = {
    trace: function (msg) {
        throw new Error('Not implemented');
    },
    debug: function (msg) {
        throw new Error('Not implemented');
    },
    info: function (msg) {
        throw new Error('Not implemented');
    },
    warn: function (msg) {
        throw new Error('Not implemented');
    },
    error: function (msg) {
        throw new Error('Not implemented');
    },
    fatal: function (msg) {
        throw new Error('Not implemented');
    }
};

module.exports = BaseLogger;