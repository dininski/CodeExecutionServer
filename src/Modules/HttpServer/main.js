'use strict';

module.exports = function setup(options, imports, register) {
    var HttpServer = require('./HttpServer');
    var httpServer = new HttpServer(options);

    register(null, {
        HttpServer: httpServer
    })
}