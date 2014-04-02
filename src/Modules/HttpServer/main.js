'use strict';

module.exports = function setup(options, imports, register) {
    var HttpServer = require('./HttpServer');
    var httpServer = new HttpServer(options.httpConfig);

    register(null, {
        HttpServer: httpServer
    })
}