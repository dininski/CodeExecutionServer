'use strict';

var Config = {
    Http: {
        port: 9000
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
                "Tty": true,
                "OpenStdin": true,
                "StdinOnce": true,
                "Cmd": [
                    "/bin/sh",
                    "-c",
                    "python3.3 userCode.py"
                ],
                "Image": "codeExecution:python3.3",
                "Volumes": {
                    "/usercode": {}
                },
                "WorkingDir": "/usercode"
            },
            runOptions: {
                "Binds": ["/media/sf_CodeExecutionServer/Sample:/usercode"]
            }
        }
    }
};

module.exports = Config;