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
}

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
};

function getUserCodeFolder(baseFolder) {
    return baseFolder + Constants.Execution.baseFolder + '/' + Constants.Execution.userFile;
};

function CodeCheckProvider() {
    this.checksLocation = '';
    this.files = [];
    this.filesCount = 0;
    this.cursor = 0;
};

CodeCheckProvider.prototype = {
    init: function (checksLocation, done) {
        var self = this;
        this.checksLocation = checksLocation;
        fs.readdir(this.checksLocation, function (err, files) {
            self.files = files;
            self.filesCount = files.length;
            done(err);
        });
    },

    getChecksAsString: function(done) {
        var checks = [];
        var self = this;
        async.each(this.files, function(file, callback) {
            var fileLocation = self.checksLocation + '/' + file;
            fs.readFile(fileLocation, function(err, data) {
                if(err) {
                    callback(err);
                } else {
                    var checkString = data.toString('utf8');
                    checks.push(checkString);
                    callback();
                }
            });
        }, function(err) {
            done(err, checks);
        });
    },

    getCheck: function (done) {
        var checkFile = this.checksLocation + '/' + this.files[this.cursor++];
        fs.readFile(checkFile, function (err, data) {
            if (err) {
                done(err);
            } else {
                var fileContents = data.toString('utf8');
                done(null, fileContents);
            }
        });
    },

    hasChecks: function () {
        return this.cursor < this.filesCount;
    }
};

module.exports = RequestProcessor;