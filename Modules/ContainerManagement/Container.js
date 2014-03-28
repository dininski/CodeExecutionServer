'use strict';

var Docker = require('dockerode');

var Container = function(options) {
    this._dockerode;
    this._dockerContainer;
}

Container.prototype = {
    init: function(container) {
        this._dockerContainer = container;
    },

    start: function() {

    },

    kill: function() {

    },

    getOutput: function() {

    }
}

module.exports = Container;