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

        var codeExecutionRequest = new CodeExecutionRequest();
        codeExecutionRequest.init(executorId, executionId, timeLimit, stdinBase64, userCodeBase64);

        var executionIdInternal = Utilities.generateGuid();
        var baseFolder = Config.ExecutionConfig.baseFolder + '/' + executionIdInternal;

        async.waterfall([
            function createExecutionDir(callback) {
                fs.mkdir(getExecutionFolder(baseFolder), callback);
            },

            function getUserCodeFileDlg(callback) {
                var userCodeFile = baseFolder + '/userCode.deflate';
                fs.readFile(userCodeFile, callback);
            },

            function onCodeInflatedDlg(code, callback) {
                var userCode = code.toString('utf8');
                var userCodeFile = getUserCodeFolder(baseFolder);

                fs.writeFile(userCodeFile, userCode, function (err) {
                    callback(err);
                });
            }
        ], function onProcessingCompeletedDlg(err) {
            if (err) {
                done(err);
            } else {
                var id = +req.body.id;
                var language = +req.body.language;

                var timeLimit = req.body.timeLimit;
                var memoryLimit = req.body.memoryLimit;
                var executionFolder = getExecutionFolder(baseFolder);

                var checkProvider = new CodeCheckProvider();

                var checksFolder = baseFolder + '/tests';
                checkProvider.init(checksFolder, function (err) {
                    done(err, codeExecutionRequest, checkProvider);
                });
            }
        });
    }
};

function getExecutionFolder(baseFolder) {
    return baseFolder + Constants.Execution.baseFolder;
}

function getUserCodeFolder(baseFolder) {
    return baseFolder + Constants.Execution.baseFolder + '/' + Constants.Execution.userFile;
}

module.exports = RequestProcessor;