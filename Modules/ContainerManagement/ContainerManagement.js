'use strict';

var Docker = require('dockerode')

var ContainerManagement = function(options) {
    this._dockerode;
}

ContainerManagement.prototype = {
    init: function(initOptions) {
        this._dockerode = new Docker(initOptions);
    }
}

module.exports = ContainerManagement;