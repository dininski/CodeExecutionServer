'use strict';
var Docker = require('dockerode');

var MetricsProvider = function (socketPath) {
    this.socketPath = socketPath;
    this._docker = {};
    this.containerMetrics = {};
};

MetricsProvider.prototype = {
    init: function (logger) {
        var self = this;

        this._logger = logger;
        this._docker = new Docker({socketPath: this.socketPath});
        this._docker.getEvents(function (err, stream) {
            if (err) {
                return self._logger.error(err);
            }

            stream.on('data', function (data) {
                var dataObj = JSON.parse(data.toString('utf8'));
                if (!self.containerMetrics[dataObj.id]) {
                    self.containerMetrics[dataObj.id] = {};
                }

                self.containerMetrics[dataObj.id][dataObj.status] = dataObj.time;
            });
        });
    },

    getMetricsForContainer: function (id) {
        if (this.containerMetrics[id] && this.containerMetrics[id].die) {
            var metrics = this.containerMetrics[id];
            delete this.containerMetrics[id];
            return metrics;
        } else {
            return false;
        }
    }
};

module.exports = MetricsProvider;