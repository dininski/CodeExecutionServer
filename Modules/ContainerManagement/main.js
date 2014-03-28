'use strict';

module.exports = function(options, imports, register) {
    var initOptions = options.initOptions;
    var ContainerManagement = require('./ContainerManagement');
    var containerManagement = new ContainerManagement();
    containerManagement.init(initOptions);

    register(null, {
        ContainerManagement: containerManagement
    });
}