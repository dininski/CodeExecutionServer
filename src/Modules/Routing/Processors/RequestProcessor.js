'use strict';
var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');

var RequestProcessor = {
    processCodeRequest: function (req, res, done) {
        CodeExecutionRequest.fromRequest(req, res, done);
    }
};

module.exports = RequestProcessor;