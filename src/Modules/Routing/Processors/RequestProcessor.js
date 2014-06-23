'use strict';

var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');
var CodeExecutionRequestOptions = require('../../../Models/CodeExecutionRequestOptions');
var Utilities = require('../../../Common/Utilities');
var Config = require('../../../Common/Config');
var Constants = require('../../../Common/Constants');
var AdmZip = require('adm-zip');
var zlib = require('zlib');
var async = require('async');
var fs = require('fs');

var RequestProcessor = function () {
};

RequestProcessor.prototype = {
    processCodeRequest: function (req, res, done) {
        var payload = req.files.payload;
        var executionId = Utilities.generateGuid();
        var baseFolder = Config.ExecutionConfig.baseFolder + '/' + executionId;

        var zip = new AdmZip(payload.path);
        zip.extractAllTo(baseFolder, true);

        async.waterfall([
            function createExecutionDir(callback) {
                fs.mkdir(getExecutionFolder(baseFolder), callback);
            },

            function getUserCodeFileDlg(callback) {
                var userCodeFile = baseFolder + '/userCode.deflate';
                fs.readFile(userCodeFile, callback);
            },

// TODO add inflate
//            function onUserCodeReadDlg(buffer, callback) {
//                zlib.inflate(buffer, callback);
//            },

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

                var options = new CodeExecutionRequestOptions();
                options.init(timeLimit, memoryLimit, executionFolder);

                var codeExecutionRequest = new CodeExecutionRequest();
                codeExecutionRequest.init(id, language, executionId, options);

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