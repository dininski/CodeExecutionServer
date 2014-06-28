var Config = require('./Common/Config');
var Constants = require('./Common/Constants');

module.exports = [
    { packagePath: "./Modules/HttpServer/", httpConfig: Config.Http },
    { packagePath: "./Modules/Routing/" },
    { packagePath: "./Modules/CodeExecution/Service/" },
    { packagePath: "./Modules/CodeExecution/Executors/", languages: Constants.Languages, executorOptions: Config.ExecutionConfig },
    { packagePath: "./Modules/CodeExecution/MetricsProvider"},
    { packagePath: "./Modules/Containers/", initOptions: Config.ContainerManagement.initOptions },
    { packagePath: "./Modules/Logger/" }
];