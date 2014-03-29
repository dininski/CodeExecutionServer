'use strict';

var CodeExecutionService = function() {
    this._executorFactory;
}

CodeExecutionService.prototype = {
    init: function(executorFactory) {
        this._executorFactory = executorFactory;
    },

    execute: function(code, language, stdin, done) {
        var executor = this._executorFactory.getExecutor(language);
        executor.run(code, stdin, done);
    }
}

module.exports = CodeExecutionService;