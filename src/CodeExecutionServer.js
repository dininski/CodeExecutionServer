'use strict';

var architect = require('architect');
var path = require('path');
var Config = require('./Common/Config');

var CodeExecutionServer = function () {
};

CodeExecutionServer.prototype = {
    start: function () {
        var configPath = path.join(__dirname, "ModulesConfig.js");
        var config = architect.loadConfig(configPath);
        architect.createApp(config, function createArchitectAppDlg(err, app) {
            if (err) {
                console.log(err);
            } else {
                app.services.HttpServer.start(Config.Http.port);
            }
        });
    }
}

module.exports = CodeExecutionServer;