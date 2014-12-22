'use strict';

module.exports = function setup(options, imports, register) {
    var HttpServer = require('./http-server');
    var httpServer = new HttpServer(options.httpConfig);

    register(null, {
        HttpServer: httpServer
    });
};
