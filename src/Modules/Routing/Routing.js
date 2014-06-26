'use strict';

var async = require('async');

var Routing = function () {
    this._codeExecutionService = {};
    this._httpServer = {};
    this.requestProcessor = {};
    this.responseProcessor = {};
};

Routing.prototype = {
    init: function (httpServer, codeExecutionService, requestProcessor, responseProcessor) {
        this._httpServer = httpServer;
        this._codeExecutionService = codeExecutionService;
        this.requestProcessor = requestProcessor;
        this.responseProcessor = responseProcessor;
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
                self.requestProcessor.processCodeRequest(req, res, callback);
            },

            function executeCodeDlg(codeExecutionRequest, checkProvider, callback) {
                self._codeExecutionService.execute(codeExecutionRequest, checkProvider, callback);
            },

            function onAllChecksRunDlg(result, callback) {
                callback(null, result);
            }
        ], function onRequestHandledDlg(err, result) {
            self._httpServer.respondJSON(req, res, result);
        });
    }
};

module.exports = Routing;
