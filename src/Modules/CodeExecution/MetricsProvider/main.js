'use strict';

module.exports = function setup(options, imports, register) {
    var MetricsProvider = require('./MetricsProvider');
    var metricsProvider = new MetricsProvider();

    register(null, {
        MetricsProvider: metricsProvider
    });
};