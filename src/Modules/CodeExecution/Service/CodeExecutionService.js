'use strict';

var CodeExecutionResult = require('../../../Models/CodeExecutionResult');
var async = require('async');

var CodeExecutionService = function () {
    this._executorFactory;
}

CodeExecutionService.prototype = {
    init: function (executorFactory) {
        this._executorFactory = executorFactory;
    },

    execute: function (codeExecutionRequest, checkProvider, done) {
        var codeExecutionResult = new CodeExecutionResult();
        this._execute(codeExecutionRequest, checkProvider, codeExecutionResult, done);
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
                            var responseResult = {
                                result: result
                            }
                            codeExecutionResult.checkResults.push(responseResult);
                            self._execute(codeExecutionRequest, checkProvider, codeExecutionResult, done);
                        }
                    });
                }
            })
        } else {
            done(null, codeExecutionResult);
        }
    }
}

module.exports = CodeExecutionService;