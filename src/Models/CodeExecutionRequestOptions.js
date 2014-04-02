'use strict';

var CodeExecutionRequestOptions = function () {
    this.memoryLimit = 0;
    this.timeLimit = 0;
};

CodeExecutionRequestOptions.prototype = {
    init: function (timeLimit, memoryLimit) {
        this.memoryLimit = memoryLimit;
        this.timeLimit = timeLimit;
    }
};

module.exports = CodeExecutionRequestOptions;