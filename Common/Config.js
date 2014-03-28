'use strict';

var Config = {
    Http: {
        port: 9000
    },
    ContainerManagement: {
        initOptions: {
            socketPath: '/var/run/docker.sock'
        }
    }
};

module.exports = Config;