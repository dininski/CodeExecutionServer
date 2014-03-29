'use strict';

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
        this._dockerContainer.attach({stream: true, stdin: true, stdout: true, stderr: true, tty: false}, done);
    },

    getOutput: function (opts, done) {
        this._dockerContainer.attach(opts, done);
    }
}

module.exports = Container;