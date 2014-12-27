'use strict';

var architect = require('architect');
var path = require('path');
var Config = require('./common/config');

var CodeExecutionServer = function () {
};

CodeExecutionServer.prototype = {
    start: function () {
        var configPath = path.join(__dirname, "modules-config.js");
        var config = architect.loadConfig(configPath);
        architect.createApp(config, function createArchitectAppDlg(err, app) {
            if (err) {
                console.log(err.stack);
            } else {
                app.services.codeExecutionService.start();
            }
        });
    }
};

module.exports = CodeExecutionServer;
