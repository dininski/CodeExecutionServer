'use strict';

module.exports = function (options, imports, register) {
    var containerOptions = options.containerOptions;
    var ContainerFactory = require('./container-factory');
    var containerFactory = new ContainerFactory();
    containerFactory.init(containerOptions);

    register(null, {
        ContainerFactory: containerFactory
    });
};