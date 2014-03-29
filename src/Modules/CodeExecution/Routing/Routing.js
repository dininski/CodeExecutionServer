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
        var timeLimit = 1000;
        this._codeExecutionService.execute('1\n2\n', 1, {timeLimit: timeLimit}, function(stdout, stderr) {

        });
    }
}

module.exports = Routing;
