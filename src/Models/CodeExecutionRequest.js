"use strict";

var CodeExecutionRequestOptions = require('./CodeExecutionRequestOptions');

var CodeExecutionRequest = function () {
    this.id = 0;
    this.executionId = '';

    this.language = '';
    this.options = {};
};

CodeExecutionRequest.prototype = {
    init: function (id, language, executionId, options) {
        this.id = id;
        this.executionId = executionId;

        this.language = language;
        this.options = options;
    }
}

module.exports = CodeExecutionRequest;