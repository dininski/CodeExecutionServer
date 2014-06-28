'use strict';

var Docker = require('dockerode');
var Container = require('./Container');

var ContainerFactory = function (logger) {
    this._logger = logger;
    this._dockerode = null;
};

ContainerFactory.prototype = {
    init: function (opts) {
        this._dockerode = new Docker(opts);
    },

    createContainer: function (opts, done) {
        var self = this;
        this._dockerode.createContainer(opts, function onContainerCreateDlg(err, dockerContainer) {
            if (err) {
                return done(err);
            }

            var container = new Container(self._logger);
            container.init(dockerContainer);
            done(null, container);
        });
    },

    getContainerById: function (id) {
        var container = new Container();
        var dockerContainer = this._dockerode.getContainer(id);
        container.init(dockerContainer);
        return container;
    }
};

module.exports = ContainerFactory;