'use strict';

var PythonExecutor = require('./python-executor');
var PhpExecutor = require('./php-executor');

var ExecutorFactory = function () {
    this._languages = null;
    this._executorOptions = null;
};

ExecutorFactory.prototype = {
    init: function (languages, executorOptions, containerFactory, logger) {
        this._languages = languages;
        this._executorOptions = executorOptions;
        this._containerFactory = containerFactory;
        this._logger = logger;
    },

    getExecutor: function (language) {
        switch (language) {
            case this._languages.Python:
                var pythonOptions = this._executorOptions.Executors.Python;
                var pythonExecutor = new PythonExecutor();
                pythonExecutor.init(this._containerFactory, pythonOptions.createOptions, pythonOptions.runOptions, this._logger);

                return pythonExecutor;

            case this._languages.Php:
                var phpOptions = this._executorOptions.Executors.Php;
                var phpExecutor = new PhpExecutor();
                phpExecutor.init(this._containerFactory, phpOptions.createOptions, phpOptions.runOptions, this._logger);

                return phpExecutor;
        }
    }
};

module.exports = ExecutorFactory;