"use strict";

var CodeExecutionRequest = function (initOptions) {
    this.executionId = 0;
    this.language = '';
    this.options = {};
    this.timeLimit = 0;
    this.stdin = '';
    this.userCode = '';
    this.executorId = 0;
};

CodeExecutionRequest.prototype = {
    init: function (initOptions) {
        this.executionId = +initOptions.executionId;
        this.timeLimit = +initOptions.timeLimit;
        this.stdin = initOptions.stdin;
        this.userCode = initOptions.userCode;
        this.executorId = +initOptions.executorId;
        this.executionFolder = initOptions.executionFolder;
    }
};

module.exports = CodeExecutionRequest;
