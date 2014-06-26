'use strict';
var Config = require('../../../Common/Config');

var Docker = require('dockerode');

var MetricsProvider = function () {
    this._docker = {};
    this.containerMetrics = {};
    this.init();
};

MetricsProvider.prototype = {
    init: function () {
        var self = this;
        this._docker = new Docker({socketPath: Config.ContainerManagement.initOptions.socketPath});
        this._docker.getEvents(function (err, stream) {
            if (err) {
                console.log(err);
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