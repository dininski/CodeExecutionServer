var Config = require('./common/config');
var Constants = require('./common/constants');

module.exports = [
    { packagePath: './modules/code-execution/service/' },
    { packagePath: './modules/code-execution/executors/', languages: Constants.Languages, executorOptions: Config.ExecutionConfig },
    { packagePath: './modules/code-execution/metrics-provider', socketPath: Config.ContainerManagement.socketPath},
    { packagePath: './modules/containers/', containerOptions: Config.ContainerManagement },
    { packagePath: './modules/logger/' }
];
