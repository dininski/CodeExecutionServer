'use strict';

module.exports = function setup(options, imports, register) {
    var Logger = require('./log4jslogger');
    var logger = new Logger();

    register(null, {
        logger: logger
    });
}
