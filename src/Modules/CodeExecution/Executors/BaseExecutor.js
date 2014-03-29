'use strict';

var async = require('async');
var startTime;
var endTime;

var BaseExecutor = function() {
    this._containerFactory;
    this._containerCreateOptions;
    this._containerRunOptions;
    this._container;
}

BaseExecutor.prototype = {
    init: function(containerFactory, containerCreateOptions, containerRunOptions) {
        this._containerFactory = containerFactory;
        this._containerCreateOptions = containerCreateOptions;
        this._containerRunOptions = containerRunOptions;
    },

    initializeExecution: function(done) {
        var self = this;
        this._containerFactory.createContainer(this._containerCreateOptions, function(err, container) {
            self._container = container;
            done();
        });
    },

    beginExecution: function(done) {
        this._container.start(this._containerRunOptions, done);
    },

    execute: function(code, executionOptions, done) {
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
                stream.setEncoding('utf8');

                var stdin = '';
                var stderr = '';

                stream.on('end', function onStreamEndDlg() {
                    console.log('Execution finished!');
                    endTime = new Date();
                    var b = startTime;
                    done();
                });

                self._container.demuxStream(stream, function onStreamProcessDlg(stdinStream, stderrStream) {


                });

                // todo demultiplex streams to provide stdout and stderr
                // todo and call done here
                stream.on('data', function (data) {
                    done();
                });

                stream.write(code);

                callback();
            },

            function containerStartDlg(callback) {
                self.beginExecution(callback);
                startTime = new Date();
            }
        ]);
    },

    _processStream: function(stream, done) {
        stream.setEncoding('utf8');
        var result = '';

        stream.on('data', function(data) {
            result += data;
        });

        stream.on('end', function() {
            done(null, result);
        })
    }
}

module.exports = BaseExecutor;