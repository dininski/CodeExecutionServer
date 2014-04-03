'use strict';
var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');
var Utilities = require('../../../Common/Utilities');
var Config = require('../../../Common/Config');
var AdmZip = require('adm-zip');
var zlib = require('zlib');
var async = require('async');
var fs = require('fs');

var RequestProcessor = function () {
}

RequestProcessor.prototype = {
    processCodeRequest: function (req, res, done) {
        var payload = req.files.payload;
        var guid = Utilities.generateGuid();
        var folder = Config.ExecutionConfig.baseFolder + '/' + guid;

        var zip = new AdmZip(payload.path);
        zip.extractAllTo(folder);

        async.waterfall([
            function createExecutionDir(callback) {
                fs.mkdir(folder + '/executionFolder', callback);
            },

            function getUserCodeFileDlg(callback) {
                var userCodeFile = folder + '/userCode.deflate';
                fs.readFile(userCodeFile, callback);
            },

// TODO add inflate
//            function onUserCodeReadDlg(buffer, callback) {
//                zlib.inflate(buffer, callback);
//            },

            function onCodeInflatedDlg(code, callback) {
                var userCode = code.toString('utf8');
                var userCodeFile = folder + '/executionFolder/userFile';
                fs.writeFile(userCodeFile, userCode, function (err) {
                    callback(err);
                });
            }
        ], function onProcessingCompeletedDlg(err) {
            if (err) {
                done(err);
            } else {
                // TODO add execution id
                CodeExecutionRequest.fromRequest(req, res, done);
            }
        });
    }
};

module.exports = RequestProcessor;