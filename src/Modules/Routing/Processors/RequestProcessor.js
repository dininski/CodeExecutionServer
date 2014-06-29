'use strict';

var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');
var Utilities = require('../../../Common/Utilities');
var Config = require('../../../Common/Config');
var Constants = require('../../../Common/Constants');
var AdmZip = require('adm-zip');
var CodeCheckProvider = require('./CodeCheckProvider');
var zlib = require('zlib');
var async = require('async');
var fs = require('fs');

var RequestProcessor = function () {
};

RequestProcessor.prototype = {
    processCodeRequest: function (req, res, done) {
        var executorId = req.params.executorId;
        var userCodeBase64 = req.body.userCode;
        var stdinBase64 = req.body.stdin;
        var executionId = req.body.id;
        var timeLimit = req.body.timeLimit;

        var executionIdInternal = Utilities.generateGuid();
        var executionFolder = Config.ExecutionConfig.baseFolder + '/' + executionIdInternal;

        var codeExecutionRequest = new CodeExecutionRequest();
        codeExecutionRequest.init(executorId, executionId, timeLimit, stdinBase64, userCodeBase64, executionFolder);

        async.waterfall([
            function createExecutionDir(callback) {
                fs.mkdir(executionFolder, callback);
            },

            function saveUserCodeDlg(callback) {
                var userCodeBuffer = new Buffer(userCodeBase64, 'base64').toString('utf8');
                var userCodeFileLocation = executionFolder + '/userFile';
                fs.writeFile(userCodeFileLocation, userCodeBuffer, callback);
            }
        ], function onProcessingCompeletedDlg(err) {
            if (err) {
                done(err);
            } else {
                done(null, codeExecutionRequest);
            }
        });
    }
};

module.exports = RequestProcessor;