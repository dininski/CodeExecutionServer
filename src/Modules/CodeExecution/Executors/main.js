'use strict';

module.exports = function setup(options, imports, register) {
    var ExecutorFactory = require('./ExecutorFactory');
    var executorFactory = new ExecutorFactory();
    executorFactory.init(options.languages, options.executorOptions, imports.ContainerFactory, imports.Logger);

    register(null, {
        ExecutorFactory: executorFactory
    });
};
