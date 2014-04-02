'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./Routing');
    var routing = new Routing();
    var httpServer = imports.HttpServer;
    var codeExecutionService = imports.CodeExecutionService;

    var RequestProcessor = require('./Processors/RequestProcessor');
    var requestProcessor = new RequestProcessor();

    var ResponseProcessor = require('./Processors/ResponseProcessor');
    var responseProcessor = new ResponseProcessor();

    routing.init(httpServer, codeExecutionService, requestProcessor, responseProcessor);
    routing.registerRoutes();

    register(null, {});
}