'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./Routing');
    var routing = new Routing();
    var httpServer = imports.HttpServer;
    routing.registerRoutes(httpServer);

    register(null, {});
}