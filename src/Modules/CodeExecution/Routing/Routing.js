'use strict';

var async = require('async');

var Routing = function () {
    this._containerFactory;
}

Routing.prototype = {
    registerRoutes: function (httpServer, containerFactory) {
        this._containerFactory = containerFactory;

        httpServer.registerRoute({
            method: 'post',
            path: '/code',
            handler: this.handleCodeExecuteRequest.bind(this)
        });
    },

    handleCodeExecuteRequest: function (req, res, next) {
        var self = this;
        var createOptions = {
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
                "/usercode": "/media/sf_CodeExecutionServer/Sample:/usercode"
            },
            "WorkingDir": "/usercode",
            "Binds": ["/media/sf_CodeExecutionServer/Sample:/usercode"]
        };

        async.waterfall([
            function createContainerDlg(callback) {
                self._containerFactory.createContainer(createOptions, callback);
            },

            function onContainerCreateDlg(container, callback) {
                container.getStream(function (err, stream) {
                    callback(err, container, stream)
                });
            },

            function onContainerStreamReadyDlg(container, stream, callback) {
                stream.setEncoding('utf8');

                stream.on('end', function () {
                    console.log('stream ended');
                });

                stream.write('1\n2\n');

                stream.on('data', function (data) {
                    console.log(data);
                });

                callback(null, container);
            },

            function containerStartDlg(container, callback) {
                var startOptions = {
                    "Binds": ["/media/sf_CodeExecutionServer/Sample:/usercode"]
                }

                container.start(createOptions, function (err, data) {
                    callback(err, container, data);
                });
            }
        ], function (err) {
            console.log('Started execution');
        });
    }
}

module.exports = Routing;
