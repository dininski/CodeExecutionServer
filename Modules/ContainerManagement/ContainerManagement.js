'use strict';

var Docker = require('dockerode')

var ContainerManagement = function(options) {
    this._dockerode;
}

ContainerManagement.prototype = {
    init: function(opts) {
        this._dockerode = new Docker(opts);
    },

    createContainer: function(opts, done) {
        this._dockerode.createContainer(opts, done);
    },

    getContainer: function(id) {
        return this._dockerode.getContainer(id);
    }
}

module.exports = ContainerManagement;