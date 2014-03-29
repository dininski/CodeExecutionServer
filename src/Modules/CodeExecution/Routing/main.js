'use strict';

module.exports = function setup(options, imports, register) {
    var Routing = require('./Routing');
    var routing = new Routing();
    var httpServer = imports.HttpServer;
    var containerFactory = imports.ContainerFactory;
    routing.registerRoutes(httpServer, containerFactory);

    register(null, {});
}