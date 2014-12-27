'use strict';

var containerFactory = require('./container-factory');

var Container = function (options) {
    this.options = options;
    this._dockerContainer = null;
};

Container.prototype = {
    init: function(done) {
        var self = this;

        containerFactory.createContainer(this.options, function(err, container) {
            if(err) {
                return done(err);
            }

            self._dockerContainer = container;
            done();
        });
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

    restart: function (done) {
        this._dockerContainer.restart(done);
    },

    getStream: function (done) {
        this._getStreamInternal({stream: true, stdin: true, stdout: true, stderr: true, tty: false}, done);
    },

    getReadStream: function (done) {
        this._getStreamInternal({stream: true, stdout: true, stderr: true, tty: false}, done);
    },

    demuxStream: function (stream, stdout, stderr) {
        this._dockerContainer.modem.demuxStream(stream, stdout, stderr);
    },

    _getStreamInternal: function (opts, done) {
        this._dockerContainer.attach(opts, done);
    },

    wait: function (done) {
        this._dockerContainer.wait(done);
    },

    inspect: function (done) {
        this._dockerContainer.inspect(done);
    },

    logs: function (opts, done) {
        this._dockerContainer.logs(opts, done);
    },

    getId: function() {
        return this._dockerContainer.id;
    }
};

module.exports = Container;
