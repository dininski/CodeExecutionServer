'use strict';

var Config = {
    Http: {
        port: 9000,
//        uploadDir: '/media/sf_docker_events/tmp'
        uploadDir: '/home/vasil/tmp'
    },
    ContainerManagement: {
        initOptions: {
            socketPath: '/var/run/docker.sock'
        }
    },
    ExecutionConfig: {
        Python: {
            createOptions: {
                "AttachStdin": true,
                "AttachStdout": true,
                "AttachStderr": true,
                "Tty": false,
                "OpenStdin": true,
                "StdinOnce": true,
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "python3.3 userFile"
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
        },
        baseFolder: '/home/vasil/tmp'
        //baseFolder: 'd:\\crap\\baseFolder'
    }
};

module.exports = Config;