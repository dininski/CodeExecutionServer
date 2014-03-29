'use strict';

var PythonExecutor = require('./PythonExecutor');

var ExecutorFactory = function () {
    this._languages;
    this._executorOptions;
}

ExecutorFactory.prototype = {
    init: function (languages, executorOptions, containerFactory) {
        this._languages = languages;
        this._executorOptions = executorOptions;
        this._containerFactory = containerFactory;
    },

    getExecutor: function (language) {
        switch (language) {
            case this._languages.Python:
                var pythonOptions = this._executorOptions.Python;
                var pythonExecutor = new PythonExecutor();
                pythonExecutor.init(this._containerFactory, pythonOptions.createOptions, pythonOptions.runOptions);

                return pythonExecutor;
        }
    }
}

module.exports = ExecutorFactory;