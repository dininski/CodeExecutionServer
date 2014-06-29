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
    init: function (executorId, executionId, timeLimit, stdin, userCode, executionFolder) {
        this.executionId = +executionId;
        this.timeLimit = +timeLimit;
        this.stdin = stdin;
        this.userCode = userCode;
        this.executorId = +executorId;
        this.executionFolder = executionFolder;
    }
};

module.exports = CodeExecutionRequest;