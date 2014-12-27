'use strict';

var async = require('async');
var SimpleStream = require('./simple-stream');
var Container = require('./container');

var Executor = function (logger) {
    this._logger = logger;
    this.createOptions = {};
    this.runOptions = {};
    this.container = {};
    this.timeLimit = 0;
    this.stdOut = null;
    this.stdErr = null;
    this.codeExecutionRequest = null;
};

Executor.prototype = {
    init: function (options) {
        this.createOptions = options;
    },

    initializeExecution: function (codeExecutionRequest, done) {
        this.codeExecutionRequest = codeExecutionRequest;
        this.timeLimit = this.codeExecutionRequest.timeLimit;

        var binds = [];
        binds.push(this.codeExecutionRequest.executionFolder + ":/executionFolder");

        this.runOptions = {
            Binds: binds
        };

        this.container = new Container(this.createOptions);
        this.container.init(done);
    },

    beginExecution: function (done) {
        this.container.start(this.runOptions, done);
    },

    execute: function (done) {
        var self = this;
        this.stdOut = new SimpleStream();
        this.stdErr = new SimpleStream();

        this.getStream(function (err, stream) {
            if (err) {
                return done(err);
            }

            var stdinContent = new Buffer(self.codeExecutionRequest.code, 'base64').toString('utf8');
            self.processStream(stream, stdinContent, function () {

            });

            self.beginExecution(function (err, container) {
                self.onExecutionFinished(function onExecuteErrorDlg(err) {
                    if (err) {
                        self._logger.error(err);
                        return done(err);
                    }

                    var result = {
                        stdOut: self.stdOut.value,
                        stdErr: self.stdErr.value
                    };

                    return done(null, result);
                });
            });
        });
    },

    getStream: function (done) {
        this.container.getStream(done);
    },

    processStream: function (stream, stdin, done) {
        var self = this;
        this.container.demuxStream(stream, this.stdOut, this.stdErr);
        stream.write(stdin, function writeStdinDlg() {
            self._logger.info('Wrote stdin');
            done();
        });
    },

    onExecutionFinished: function (callback) {
        var self = this;

        this.container.wait(function (err, data) {
            self.container.inspect(function (err, data) {
                self._executionStart = new Date(data.State.StartedAt);
                self._executionEnd = new Date(data.State.FinishedAt);
                callback();
            });
        });
    },

    cleanup: function (done) {
        this.container.remove(done);
    },

    getExecutionTime: function () {
        return this._executionEnd - this._executionStart;
    }
};

module.exports = Executor;
