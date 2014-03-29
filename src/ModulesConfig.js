var Config = require('./Common/Config');
var Constants = require('./Common/Constants');

module.exports = [
    { packagePath: "./Modules/HttpServer/" },
    { packagePath: "./Modules/CodeExecution/Routing/" },
    { packagePath: "./Modules/CodeExecution/Service/" },
    { packagePath: "./Modules/CodeExecution/Executors/", languages: Constants.Languages },
    { packagePath: "./Modules/ContainerFactory/", initOptions: Config.ContainerManagement.initOptions }
]