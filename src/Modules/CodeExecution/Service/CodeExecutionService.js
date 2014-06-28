'use strict';

var CodeExecutionResult = require('../../../Models/CodeExecutionResult');
var async = require('async');

var CodeExecutionService = function () {
    this._executorFactory = null;
};

CodeExecutionService.prototype = {
    init: function (executorFactory, metricsProvider, logger) {
        this._logger = logger;
        this._executorFactory = executorFactory;
        this._metricsProvider = metricsProvider;
    },

    execute: function (codeExecutionRequest, checkProvider, done) {
        var codeExecutionResult = new CodeExecutionResult();
        this._executeSingleWorker(codeExecutionRequest, checkProvider, codeExecutionResult, done);
    },

    _executeSingleWorker: function (codeExecutionRequest, checkProvider, codeExecutionResult, done) {
        var self = this;
        var executor = self._executorFactory.getExecutor(codeExecutionRequest.language);
        var executionStartTime;
        var totalTimeInExec = 0;
        executor.initializeExecution(codeExecutionRequest.options, function (err) {
            self._logger.info('Initialized execution');
            executionStartTime = new Date();
            if (err) {
                self._logger.error(err);
            }

            checkProvider.getChecksAsString(function (err, checks) {
                if (err) {
                    self._logger.error(err);
                }
                self._logger.info('Got checks as strings');

                async.eachSeries(checks, function (check, callback) {
                    executor.execute(check, false, function (err, result) {
                        self._logger.info('Finished execution');
                        if (err) {
                            callback(err);
                        } else {
                            result.runningTime = executor.getExecutionTime();

                            var responseResult = {
                                result: result
                            };
                            totalTimeInExec += result.runningTime;

                            codeExecutionResult.checkResults.push(responseResult);
                            callback();
                        }
                    });
                }, function (errEach) {
                    self._logger.info('Total execution time: ' + (new Date() - executionStartTime));
                    self._logger.info('Total exec time: ' + totalTimeInExec);

                    return done(errEach, codeExecutionResult);
                });
            });
        });
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