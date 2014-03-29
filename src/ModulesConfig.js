var Config = require('./Common/Config');

module.exports = [
    { packagePath: "./Modules/HttpServer/" },
    { packagePath: "./Modules/CodeExecution/Routing/" },
    { packagePath: "./Modules/ContainerManagement/", initOptions: Config.ContainerManagement.initOptions }
]