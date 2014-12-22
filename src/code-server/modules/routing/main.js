'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./routing');
    var routing = new Routing();
    var httpServer = imports.HttpServer;
    var codeExecutionService = imports.CodeExecutionService;

    var RequestProcessor = require('./processors/request-processor');
    var requestProcessor = new RequestProcessor();

    var ResponseProcessor = require('./processors/response-processor');
    var responseProcessor = new ResponseProcessor();

    routing.init(httpServer, codeExecutionService, requestProcessor, responseProcessor);
    routing.registerRoutes();

    register(null, {});
};