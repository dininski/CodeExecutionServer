'use strict';

var util = require('util');
var log4js = require('log4js');


var Log4JsLogger = function () {
    this._logger = log4js.getLogger();
};

Log4JsLogger.prototype.trace = function (msg) {
    this._logger.trace(msg);
};

Log4JsLogger.prototype.debug = function (msg) {
    this._logger.debug(msg);
};

Log4JsLogger.prototype.info = function (msg) {
    this._logger.info(msg);
};

Log4JsLogger.prototype.warn = function (msg) {
    this._logger.warn(msg);
};

Log4JsLogger.prototype.error = function (msg) {
    this._logger.error(msg);
};

Log4JsLogger.prototype.fatal = function (msg) {
    this._logger.fatal(msg);
};

module.exports = Log4JsLogger;