'use strict';
var Docker = require('dockerode');

var dockerode = new Docker({
    socketPath: '/var/run/docker.sock'
});

module.exports = {
    createContainer: function() {
        return dockerode.createContainer.apply(dockerode, arguments);
    }
};
