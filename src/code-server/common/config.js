'use strict';

var Config = {
    Http: {
        port: 9000
    },
    ContainerManagement: {
        socketPath: '/var/run/docker.sock'
    },
    ExecutionConfig: {
        Executors: {
            Python: {
                createOptions: {
                    "AttachStdin": true,
                    "AttachStdout": true,
                    "AttachStderr": true,
                    "Tty": false,
                    "OpenStdin": true,
                    "StdinOnce": true,
                    "Cmd": [
                        "/usr/binpython3.3",
                        "userFile"
                    ],
                    "Image": "codeExecution:python3.3",
                    "Volumes": {
                        "/executionFolder": {}
                    },
                    "WorkingDir": "/executionFolder"
                },
                runOptions: {}
            },
            Php: {
                createOptions: {
                    "AttachStdin": true,
                    "AttachStdout": true,
                    "AttachStderr": true,
                    "Tty": false,
                    "OpenStdin": true,
                    "StdinOnce": true,
                    "Cmd": [
                        "/usr/bin/php",
                        "userFile"
                    ],
                    "Image": "codeExecution:php5",
                    "Volumes": {
                        "/executionFolder": {}
                    },
                    "WorkingDir": "/executionFolder"
                },
                runOptions: {}
            }
        },
        baseFolder: '/home/vasil/tmp'
        //baseFolder: 'd:\\crap\\baseFolder'
    }
};

module.exports = Config;