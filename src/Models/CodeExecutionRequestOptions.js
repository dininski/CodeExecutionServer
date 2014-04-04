'use strict';

var CodeExecutionRequestOptions = function () {
    this.memoryLimit = 0;
    this.timeLimit = 0;
    this.executionFolder = '';
};

CodeExecutionRequestOptions.prototype = {
    init: function (timeLimit, memoryLimit, executionFolder) {
        this.memoryLimit = memoryLimit;
        this.timeLimit = timeLimit;
        this.executionFolder = executionFolder;
    }
};

module.exports = CodeExecutionRequestOptions;