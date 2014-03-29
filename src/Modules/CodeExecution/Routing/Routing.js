'use strict';

var async = require('async');

var Routing = function () {
    this._codeExecutionService;
    this._httpServer;
}

Routing.prototype = {
    init: function(httpServer, codeExecutionService) {
        this._httpServer = httpServer;
        this._codeExecutionService = codeExecutionService;
    },

    registerRoutes: function () {
        this._httpServer.registerRoute({
            method: 'post',
            path: '/execute',
            handler: this.handleCodeExecuteRequest.bind(this)
        });
    },

    handleCodeExecuteRequest: function (req, res, next) {
        var language = parseInt(req.body.language, 10);
        var self = this;
        var timeLimit = 1000;
        var argsString = '1\n2\n';
        this._codeExecutionService.execute(argsString, language, {timeLimit: timeLimit}, function(err, result) {
            self._httpServer.respondJSON(req, res, result);
        });
    }
}

module.exports = Routing;
