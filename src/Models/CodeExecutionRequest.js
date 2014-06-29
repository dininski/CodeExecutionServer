"use strict";

var CodeExecutionRequest = function () {
    this.executionId = 0;
    this.language = '';
    this.options = {};
    this.timeLimit = 0;
    this.stdin = '';
    this.userCode = '';
    this.executorId = 0;
};

CodeExecutionRequest.prototype = {
    init: function (executorId, executionId, timeLimit, stdin, userCode) {
        this.executionId = executionId;
        this.timeLimit = timeLimit;
        this.stdin = stdin;
        this.userCode = userCode;
        this.executorId = executorId;
    }
};

module.exports = CodeExecutionRequest;