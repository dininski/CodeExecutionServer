'use strict';

var ReadableStream = require('readable-stream');

var Container = function (options) {
    this._dockerContainer;
}

Container.prototype = {
    init: function (container) {
        this._dockerContainer = container;
    },

    start: function (opts, done) {
        this._dockerContainer.start(opts, done);
    },

    kill: function (done) {
        this._dockerContainer.kill(done);
    },

    remove: function (done) {
        this._dockerContainer.remove(done);
    },

    getStream: function (done) {
        // TODO extract in constants/config
        this._dockerContainer.attach({stream: true, stdin: true, stdout: true, stderr: true, tty: false}, done);
    },

    demuxStream: function(stream, done) {
        var stdout = new StreamMock();
        var stderr = new StreamMock();
        this._dockerContainer.modem.demuxStream(stream, stdout, stderr);
        done(stdout, stderr);
    },

    getOutput: function (opts, done) {
        this._dockerContainer.attach(opts, done);
    },

    getReadStream: function (done) {
        this._dockerContainer.attach({stream: true, stdout: true, stderr: true, tty: false}, done);
    }
}

// TODO - refactor and update
var StreamMock = function() {
    this.value = '';
}

StreamMock.prototype = {
    write: function(data) {
        this.value += data.toString();
    }
}

module.exports = Container;