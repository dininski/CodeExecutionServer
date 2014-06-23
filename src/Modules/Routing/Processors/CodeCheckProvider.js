'use strict';

var fs = require('fs');
var async = require('async');

function CodeCheckProvider() {
    this.checksLocation = '';
    this.files = [];
    this.filesCount = 0;
    this.cursor = 0;
}

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

    getChecksAsString: function (done) {
        var checks = [];
        var self = this;
        async.each(this.files, function (file, callback) {
            var fileLocation = self.checksLocation + '/' + file;
            fs.readFile(fileLocation, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    var checkString = data.toString('utf8');
                    checks.push(checkString);
                    callback();
                }
            });
        }, function (err) {
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

module.exports = CodeCheckProvider;