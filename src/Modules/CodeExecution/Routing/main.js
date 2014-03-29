'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./Routing');
    var routing = new Routing();
    var httpServer = imports.HttpServer;
    var codeExecutionService = imports.CodeExecutionService;
    routing.init(httpServer, codeExecutionService);
    routing.registerRoutes();

    register(null, {});
}