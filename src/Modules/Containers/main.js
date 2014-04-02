'use strict';

module.exports = function (options, imports, register) {
    var initOptions = options.initOptions;
    var ContainerFactory = require('./ContainerFactory');
    var containerFactory = new ContainerFactory();
    containerFactory.init(initOptions);

    register(null, {
        ContainerFactory: containerFactory
    });
}