'use strict';

module.exports = function setup(options, imports, register) {
    var ExecutorFactory = require('./ExecutorFactory');
    var executorFactory = new ExecutorFactory();
    executorFactory.init(options.languages);

    register(null, {
        ExecutorFactory: executorFactory
    });
}