'use strict';

var CodeExecutionResult = require('../../../Models/CodeExecutionResult');
var async = require('async');

var CodeExecutionService = function () {
    this._executorFactory = null;
};

CodeExecutionService.prototype = {
    init: function (executorFactory, metricsProvider) {
        this._executorFactory = executorFactory;
        this._metricsProvider = metricsProvider;
    },

    execute: function (codeExecutionRequest, checkProvider, done) {
        var codeExecutionResult = new CodeExecutionResult();
        this._executeParallel(codeExecutionRequest, checkProvider, codeExecutionResult, done);
    },

    _executeParallel: function (codeExecutionRequest, checkProvider, codeExecutionResult, done) {
        var self = this;
        checkProvider.getChecksAsString(function (err, checks) {
            async.each(checks, function (check, callback) {
                var executor = self._executorFactory.getExecutor(codeExecutionRequest.language);
                executor.execute(check, codeExecutionRequest.options, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        var executionMetrics = self._metricsProvider.getMetricsForContainer(executor._id);
                        var runningTime = executionMetrics.die - executionMetrics.start;
                        result.runningTime = runningTime;

                        var responseResult = {
                            result: result
                        };

                        codeExecutionResult.checkResults.push(responseResult);
                        callback();
                    }
                });
            }, function (errEach) {
                return done(errEach, codeExecutionResult);
            });
        });
    },

    _execute: function (codeExecutionRequest, checkProvider, codeExecutionResult, done) {
        var self = this;
        if (checkProvider.hasChecks()) {
            checkProvider.getCheck(function (err, check) {
                if (err) {
                    done(err);
                } else {
                    var executor = self._executorFactory.getExecutor(codeExecutionRequest.language);
                    executor.execute(check, codeExecutionRequest.options, function (err, result) {
                        if (err) {
                            done(err);
                        } else {
                            var executionMetrics = self._metricsProvider.getMetricsForContainer(executor._id);
                            var runningTime = executionMetrics.die - executionMetrics.start;
                            result.runningTime = runningTime;

                            var responseResult = {
                                result: result
                            };

                            codeExecutionResult.checkResults.push(responseResult);
                            self._execute(codeExecutionRequest, checkProvider, codeExecutionResult, done);
                        }
                    });
                }
            });
        } else {
            done(null, codeExecutionResult);
        }
    }
};

module.exports = CodeExecutionService;