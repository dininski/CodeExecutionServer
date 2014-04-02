'use strict';

var async = require('async');

var CodeExecutionService = function () {
    this._executorFactory;
}

CodeExecutionService.prototype = {
    init: function (executorFactory) {
        this._executorFactory = executorFactory;
    },

    execute: function (codeExecutionRequest, tests, done) {
        var executor = this._executorFactory.getExecutor(codeExecutionRequest.language);

        // TODO change this signature - it needs to take in the stdin/test code
        executor.execute(codeExecutionRequest.userCode, codeExecutionRequest.executionOptions, done);
    }
}

module.exports = CodeExecutionService;