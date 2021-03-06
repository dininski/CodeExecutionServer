'use strict';

module.exports = function setup(options, imports, register) {
    var CodeExecutionService = require('./CodeExecutionService');
    var codeExecutionService = new CodeExecutionService();
    var languages = options.languages;
    codeExecutionService.init(imports.ExecutorFactory, imports.MetricsProvider, imports.Logger);

    register(null, {
        CodeExecutionService: codeExecutionService
    });
};