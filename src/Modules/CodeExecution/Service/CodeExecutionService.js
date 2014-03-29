'use strict';

var CodeExecutionService = function() {
    this._executorFactory;
}

CodeExecutionService.prototype = {
    init: function(executorFactory) {
        this._executorFactory = executorFactory;
    },

    execute: function(code, language, executionOptions, done) {
        var executor = this._executorFactory.getExecutor(language);
        executor.execute(code, executionOptions, done);
    }
}

module.exports = CodeExecutionService;