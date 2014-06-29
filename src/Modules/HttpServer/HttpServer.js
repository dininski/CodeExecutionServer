'use strict';

var express = require('express');
var http = require('http');

var allowCrossDomain = function(req, res, next) {
    var responseSettings = {
        "AccessControlAllowOrigin": "*",
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}

var HttpServer = function (config) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.app.use(express.bodyParser({ keepExtensions: true, uploadDir: config.uploadDir }));
    this.app.all(allowCrossDomain);
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