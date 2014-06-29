'use strict';

var async = require('async');

var Config = require('../../Common/Config');
var Constants = require('../../Common/Constants');

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
            path: '/executors/:executorId(\\d+)/execute',
            handler: this.handleCodeExecuteRequest.bind(this)
        });

        this._httpServer.registerRoute({
            method: 'get',
            path: '/executors',
            handler: this.handleGetExecutorsRequest.bind(this)
        });
    },

    handleCodeExecuteRequest: function (req, res, next) {
        var self = this;
        async.waterfall([
            function processRequestDlg(callback) {
                self.requestProcessor.processCodeRequest(req, res, callback);
            },

            function executeCodeDlg(codeExecutionRequest, callback) {
                self._codeExecutionService.execute(codeExecutionRequest, callback);
            },

            function onAllChecksRunDlg(result, callback) {
                callback(null, result);
            }
        ], function onRequestHandledDlg(err, result) {
            self._httpServer.respondJSON(req, res, result);
        });
    },

    handleGetExecutorsRequest: function (req, res, next) {
        var executors = [];
        var executorsInConfig = Config.ExecutionConfig.Executors;
        var names = Object.getOwnPropertyNames(executorsInConfig);

        for (var i = 0; i < names.length; i++) {
            executors.push({
                name: names[i],
                id: Constants.Languages[names[i]]
            });
        }

        this._httpServer.respondJSON(req, res, executors);
    }
};

module.exports = Routing;
