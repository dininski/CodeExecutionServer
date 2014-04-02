'use strict';

var Docker = require('dockerode');
var Container = require('./Container');

var ContainerFactory = function (options) {
    this._dockerode;
}

ContainerFactory.prototype = {
    init: function (opts) {
        this._dockerode = new Docker(opts);
    },

    createContainer: function (opts, done) {
        this._dockerode.createContainer(opts, function onContainerCreateDlg(err, dockerContainer) {
            if (err) {
                return done(err);
            }

            var container = new Container();
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
}

module.exports = ContainerFactory;