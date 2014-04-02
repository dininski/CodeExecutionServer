'use strict';
var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');

var RequestProcessor = function() {
}

RequestProcessor.prototype = {
    processCodeRequest: function (req, res, done) {
        var payload = req.files.payload;
        

        CodeExecutionRequest.fromRequest(req, res, done);
    }
};

module.exports = RequestProcessor;