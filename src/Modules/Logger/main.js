'use strict';

module.exports = function setup(options, imports, register) {
    var Logger = require('./Log4JsLogger');
    var logger = new Logger();

    register(null, {
        Logger: logger
    });
}