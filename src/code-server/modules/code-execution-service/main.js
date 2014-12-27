'use strict';

module.exports = function (options, imports, register) {
    var CodeExecutionService = require('./code-execution');
    var codeExecutionService = new CodeExecutionService(imports.dataService, imports.logger);

    register(null, {
        codeExecutionService: codeExecutionService
    });
};
