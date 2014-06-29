'use strict';

var express = require('express');
var http = require('http');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var HttpServer = function (config) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.app.use(express.bodyParser({ keepExtensions: true, uploadDir: config.uploadDir }));
    this.app.use(allowCrossDomain);
};

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

    respondJSON: function (req, res, obj) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(obj));
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
};

module.exports = HttpServer;