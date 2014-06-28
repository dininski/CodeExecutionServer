'use strict';

var async = require('async');

var BaseExecutor = function () {
    this._containerFactory = {};
    this._containerCreateOptions = {};
    this._containerRunOptions = {};
    this._container = {};
    this._id = '';
    this.timeLimit = 0;
};

BaseExecutor.prototype = {
    init: function (containerFactory, containerCreateOptions, containerRunOptions, logger) {
        this._containerFactory = containerFactory;
        this._containerCreateOptions = containerCreateOptions;
        this._containerRunOptions = containerRunOptions;
        this._logger = logger;
    },

    initializeExecution: function (done) {
        var self = this;
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

    execute: function (stdinContent, executionOptions, done) {
        var self = this;

        this._containerCreateOptions.Memory = executionOptions.memoryLimit;
        var timeLimit = executionOptions.timeLimit;
        var binds = [];
        binds.push(executionOptions.executionFolder + ":/executionFolder");
        this._containerRunOptions.Binds = binds;

        async.waterfall([
            function createContainerDlg(callback) {
                BaseExecutor.prototype.initializeExecution.call(self, callback);
            },

            function onContainerCreateDlg(callback) {
                self._container.getStream(callback);
            },

            function onContainerStreamReadyDlg(stream, callback) {
                self.writeStdin(stream, stdinContent, callback);
            },

            function onContainerCreateDlg(callback) {
                self._container.getReadStream(callback);
            },

            function onContainerCreateDlg(stream, callback) {
                self.attachToOutput(stream, callback, done);
            },

            function containerStartDlg(callback) {
                BaseExecutor.prototype.beginExecution.call(self, callback);
            }

        ], function onExecuteErrorDlg(err) {
            if (err) {
                self._logger.error(err);
            }
        });
    },

    recycle: function (done) {
        this._container.restart(done);
    },

    writeStdin: function (stream, args, done) {
        stream.write(args, function writeStdinDlg() {
            done();
        });
    },

    attachToOutput: function (stream, callback, done) {
        var stdout;
        var stderr;
        var self = this;

        stream.on('end', function onStreamEndDlg() {
            var result = {
                stdout: stdout.value,
                stderr: stderr.value
            };

            BaseExecutor.prototype._cleanup.call(self, result, done);
        });

        this._container.demuxStream(stream, function onStreamProcessDlg(stdoutStream, stderrStream) {
            stdout = stdoutStream;
            stderr = stderrStream;
        });

        callback();
    },

    _cleanup: function (result, done) {
        var self = this;

        self._logger.info('Execution finished!');

        async.waterfall([
            function killContainerDlg(callback) {
                self._container.kill(callback);
            },
            function removeContainerDlg(data, callback) {
                self._container.remove(callback);
            }
        ], function (err) {
            done(err, result);
        });
    }
};

module.exports = BaseExecutor;
