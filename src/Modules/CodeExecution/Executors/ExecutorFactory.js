'use strict';

var PythonExecutor = require('./PythonExecutor');
var PhpExecutor = require('./PhpExecutor');

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

            case this._languages.Php:
                var phpOptions = this._executorOptions.Php;
                var phpExecutor = new PhpExecutor();
                phpExecutor.init(this._containerFactory, phpOptions.createOptions, phpOptions.runOptions);

                return phpExecutor;
        }
    }
}

module.exports = ExecutorFactory;