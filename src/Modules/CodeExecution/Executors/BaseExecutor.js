'use strict';

var async = require('async');
var SimpleStream = require('./SimpleStream');

var BaseExecutor = function () {
    this._containerFactory = {};
    this._containerCreateOptions = {};
    this._containerRunOptions = {};
    this._container = {};
    this._id = '';
    this.timeLimit = 0;
    this.stdOut = null;
    this.stdErr = null;
    this.codeExecutionRequest = null;
    this._executionStart = null;

};

BaseExecutor.prototype = {
    init: function (containerFactory, containerCreateOptions, containerRunOptions, logger) {
        this._containerFactory = containerFactory;
        this._containerCreateOptions = containerCreateOptions;
        this._containerRunOptions = containerRunOptions;
        this._logger = logger;
    },

    initializeExecution: function (codeExecutionRequest, done) {
        this.codeExecutionRequest = codeExecutionRequest;
        this.timeLimit = this.codeExecutionRequest.timeLimit;

        var binds = [];
        binds.push(this.codeExecutionRequest.executionFolder + ":/executionFolder");
        var self = this;

        // TODO: add as option
        this._containerCreateOptions.Memory = this.codeExecutionRequest.memoryLimit || 5000000;

        this._containerRunOptions.Binds = binds;
        this._containerFactory.createContainer(this._containerCreateOptions, function (err, container) {
            if (err) {
                done(err);
            } else {
                self._container = container;
                self._id = container._dockerContainer.id;
                done();
            }
        });
    },

    beginExecution: function (done) {
        this._container.start(this._containerRunOptions, done);
    },

    execute: function (done) {
        var self = this;
        this.stdOut = new SimpleStream();
        this.stdErr = new SimpleStream();
        this._logger.info('Started new execution');
        this.getStream(function (err, stream) {
            if (err) {
                return done(err);
            }

            var stdinContent = new Buffer(self.codeExecutionRequest.stdin, 'base64').toString('utf8');
            self.processStream(stream, stdinContent, function () {

            });

            self.beginExecution(function (err, container) {
                self._logger.info('Container started!');
                self.executionFinished(function onExecuteErrorDlg(err) {
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
        this._container.getStream(done);
    },

    processStream: function (stream, stdin, done) {
        var self = this;
        this._container.demuxStream(stream, this.stdOut, this.stdErr);
        stream.write(stdin, function writeStdinDlg() {
            self._logger.info('Wrote stdin');
            done();
        });
    },

    executionFinished: function (callback) {
        var self = this;

        this._container.wait(function (err, data) {
            self._container.inspect(function (err, data) {
                self._executionStart = new Date(data.State.StartedAt);
                self._executionEnd = new Date(data.State.FinishedAt);
                callback();
            });
        });
    },

    cleanup: function (done) {
        this._container.remove(done);
    },

    getExecutionTime: function () {
        return this._executionEnd - this._executionStart;
    }
};

module.exports = BaseExecutor;
