'use strict';

var async = require('async');
var RequestProcessor = require('./Processors/RequestProcessor');

var Routing = function () {
    this._codeExecutionService;
    this._httpServer;
}

Routing.prototype = {
    init: function (httpServer, codeExecutionService) {
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
        var self = this;
        async.waterfall([
            function processRequestDlg(callback) {
                RequestProcessor.processCodeRequest(req, res, callback);
            },

            function executeCode(codeExecutionRequest, tests, callback) {
                self._codeExecutionService.execute(codeExecutionRequest, tests, callback);
            }
        ], function onRequestHandledDlg(err, result) {
            self._httpServer.respondJSON(req, res, result);
        });
    }
}

module.exports = Routing;
