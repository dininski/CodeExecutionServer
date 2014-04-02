"use strict";

var CodeExecutionRequestOptions = require('./CodeExecutionRequestOptions');

var CodeExecutionRequest = function () {
    this.id = 0;
    this.userCode = '';
    this.language = '';
    this.options = {};
};

CodeExecutionRequest.prototype = {
    init: function (id, language, userCode, options) {
        this.id = id;
        this.language = language;
        this.userCode = userCode;
        this.executionOptions = options;
    }
}

CodeExecutionRequest.fromRequest = function (req, res, done) {
    var codeExecutionRequest = new CodeExecutionRequest();

    var id = +req.body.id;
    var language = +req.body.language;
    var userCode = req.body.code;

    var options = new CodeExecutionRequestOptions();
    var timeLimit = req.body.timeLimit;
    var memoryLimit = req.body.memoryLimit;

    options.init(timeLimit, memoryLimit);
    codeExecutionRequest.init(id, language, userCode, options);

    done(null, codeExecutionRequest);
};

module.exports = CodeExecutionRequest;