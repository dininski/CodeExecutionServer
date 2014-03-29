'use strict';

var Container = function(options) {
    this._dockerContainer;
}

Container.prototype = {
    init: function(container) {
        this._dockerContainer = container;
    },

    start: function(opts, done) {
        this._dockerContainer.start(done);
    },

    kill: function(done) {
        this._dockerContainer.kill(done);
    },

    remove: function(done) {
        this._dockerContainer.remove(done);
    },

    getOutput: function(opts, done) {
        this._dockerContainer.attach(opts, done);
    }
}

module.exports = Container;