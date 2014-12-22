'use strict';

var async = require('async');

var CodeExecutionService = function () {
    this._executorFactory = null;
};

CodeExecutionService.prototype = {
    init: function (executorFactory, metricsProvider, logger) {
        this._logger = logger;
        this._executorFactory = executorFactory;
    },

    execute: function (codeExecutionRequest, done) {
        this._executeInternal(codeExecutionRequest, done);
    },

    _executeInternal: function (codeExecutionRequest, done) {
        var self = this;
        var executor = self._executorFactory.getExecutor(codeExecutionRequest.executorId);
        executor.initializeExecution(codeExecutionRequest, function (err) {
            self._logger.info('Initialized execution');
            if (err) {
                self._logger.error(err);
            }

            executor.execute(function(err, result) {
                if (err) {
                    self._logger.error(err);
                    return done(err);
                }

                result.runningTime = executor.getExecutionTime();

                done(null, result);
            });
        });
    }
};

module.exports = CodeExecutionService;