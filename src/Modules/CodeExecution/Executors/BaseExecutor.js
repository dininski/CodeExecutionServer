'use strict';

var async = require('async');

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

    _createContainer: function(done) {
        this._container = this._containerFactory.createContainer(this._containerCreateOptions, done);
    },

    _startContainer: function(done) {
        this._container.start(this._containerRunOptions, done);
    },

    run: function(code, stdin, stderr, time, done) {
        var self = this;
        async.waterfall([
            function createContainerDlg(callback) {
                self._createContainer(callback);
            },

            function onContainerCreateDlg(callback) {
                self.container.getStream(callback);
            },

            function onContainerStreamReadyDlg(stream, callback) {
                stream.setEncoding('utf8');

                stream.on('end', function () {
                    callback();
                });

                // todo demultiplex streams to provide stdout and stderr
                stream.on('data', function (data) {
                    console.log(data);
                });

                stream.write(code);
            },

            function containerStartDlg(container, callback) {
                self.container._startContainer(callback);
            }
        ], done);
    }
}

module.exports = BaseExecutor;