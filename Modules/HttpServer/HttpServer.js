'use strict';

var express = require('express');
var http = require('http');

var HttpServer = function (config) {
    this.app = express();
    this.server = http.createServer(this.app);
}

HttpServer.prototype = {

    start: function (port) {
        this.server.listen(port);
    },

    registerRoute: function (routeOptions) {
        var action = this._resolveAction(routeOptions.method);

        var args = [];
        args.push(routeOptions.path);

        if (routeOptions.middleware) {
            args.push(routeOptions);
        }

        args.push(routeOptions.handler);

        action.apply(this.app, args);
    },

    _resolveAction: function (verb) {
        var verbToLower = verb.toLowerCase();

        switch (verbToLower) {
            case 'post':
                return this.app.post;
            case 'get':
                return this.app.get;
        }
    }
}

module.exports = HttpServer;