'use strict';

module.exports = function setup(options, imports, register) {
    var MetricsProvider = require('./metrics-provider');
    var metricsProvider = new MetricsProvider(options.socketPath);
    metricsProvider.init(imports.Logger);

    register(null, {
        MetricsProvider: metricsProvider
    });
};