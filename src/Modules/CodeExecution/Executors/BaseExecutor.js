'use strict';

var async = require('async');
var startTime;
var endTime;

var BaseExecutor = function () {
    this._containerFactory;
    this._containerCreateOptions;
    this._containerRunOptions;
    this._container;
    this.timer;
}

BaseExecutor.prototype = {
    init: function (containerFactory, containerCreateOptions, containerRunOptions) {
        this._containerFactory = containerFactory;
        this._containerCreateOptions = containerCreateOptions;
        this._containerRunOptions = containerRunOptions;
    },

    initializeExecution: function (done) {
        var self = this;
        this._containerFactory.createContainer(this._containerCreateOptions, function (err, container) {
            self._container = container;
            done();
        });
    },

    beginExecution: function (done) {
        this._container.start(this._containerRunOptions, done);
    },

    execute: function (code, executionOptions, done) {
        var timeLimit = executionOptions.timeLimit;

        var self = this;
        async.waterfall([
            function createContainerDlg(callback) {
                self.initializeExecution(callback);
            },

            function onContainerCreateDlg(callback) {
                self._container.getStream(callback);
            },

            function onContainerStreamReadyDlg(stream, callback) {
                var stdout;
                var stderr;

                stream.on('end', function onStreamEndDlg() {
                    var endTime = new Date();
                    var executionTime = endTime - self.timer;
                    var result = {
                        stdout: stdout.value,
                        stderr: stderr.value,
                        executionTime: executionTime
                    }

                    self._cleanup(result, done);
                });

                self._container.demuxStream(stream, function onStreamProcessDlg(stdoutStream, stderrStream) {
                    stdout = stdoutStream;
                    stderr = stderrStream;
                });

                stream.write(code);

                callback();
            },

            function containerStartDlg(callback) {
                self.beginExecution(callback);
            },

            function onContainerStarted(data, callback) {
                self.timer = new Date();
                callback();
            }
        ], function onExecuteErrorDlg(err) {
            if (err) {
                console.log(err);
            }
        });
    },

    _cleanup: function (result, done) {
        var self = this;
        async.waterfall([
            function killContainerDlg(callback) {
                self._container.kill(callback);
            },
            function removeContainerDlg(data, callback) {
                self._container.remove(function (err) {
                    callback(err, result);
                });
            }
        ], done)
        console.log('Execution finished!');
    }
}

module.exports = BaseExecutor;