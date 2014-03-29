'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./CodeExecutionService');
    var routing = new CodeExecutionService();
    var httpServer = imports.HttpServer;
    routing.registerRoutes(httpServer);

    register(null, {});
}