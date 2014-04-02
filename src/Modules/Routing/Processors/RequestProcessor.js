'use strict';
var CodeExecutionRequest = require('../../../Models/CodeExecutionRequest');
var Utilities = require('../../../Common/Utilities');
var Config = require('../../../Common/Config');
var AdmZip = require('adm-zip');
var zlib = require('zlib');
var async = require('async');
var fs = require('fs');

var RequestProcessor = function() {
}

RequestProcessor.prototype = {
    processCodeRequest: function (req, res, done) {
        var payload = req.files.payload;
        var guid = Utilities.generateGuid();
        var folder = Config.ExecutionConfig.baseFolder + '/' + guid;

        var zip = new AdmZip(payload.path);
        zip.extractAllTo(folder);

        async.waterfall([
            function getUserCodeFileDlg(callback) {
                var userCodeFile = folder + '/userCode.txt.gz';
                fs.readFile(userCodeFile, callback);
            },

            function onUserCodeReadingDlg(buffer, callback) {
                
            }
        ], function onProcessingCompeletedDlg(err) {
            console.log(err);
        });

        CodeExecutionRequest.fromRequest(req, res, done);
    }
};

module.exports = RequestProcessor;