'use strict';

module.exports = function(options, imports, register) {
    var initOptions = options.initOptions;
    var ContainerManagement = require('./ContainerFactory');
    var containerManagement = new ContainerFactory();
    containerManagement.init(initOptions);

    register(null, {
        ContainerManagement: containerManagement
    });
}