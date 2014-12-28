'use strict';

var Executor = require('../../../code-worker/executor');
var _ = require('lodash');

var defaultOptions = {
    'AttachStdin': true,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': false,
    'OpenStdin': true,
    'StdinOnce': true,
    'Volumes': {
        '/executionFolder': {}
    },
    'WorkingDir': '/executionFolder'
};

var CodeExecutionService = function (dataService, logger) {
    this.dataService = dataService;
    this.logger = logger;
};

CodeExecutionService.prototype = {
    start: function () {
        var self = this;

        //setInterval(function() {
        var Submission = self.dataService.get('Submission');
        var submission = new Submission();
        submission.code = '<?php\n\
        function solve() {\n\
            // Read input data\n\
            $X = (float) fgets(STDIN);\n\
            $Y = (float) fgets(STDIN);\n\
            // Solve the problem\n\
            if ($X == 0 && $Y == 0) {\n\
                return 0;\n\
            } else if ($X == 0) {\n\
                return 5;\n\
            } else if ($Y == 0) {\n\
                return 6;\n\
            } else if ($X > 0 && $Y > 0) {\n\
                return 1;\n\
            } else if ($X < 0 && $Y > 0) {\n\
                return 2;\n\
            } else if ($X < 0 && $Y < 0) {\n\
                return 3;\n\
            } else {\n\
                return 4;\n\
            }\n\
        }\n\
        echo solve();\n\
        ?>';

        var executionId = Math.random();

        var executionFolder = '/tmp/' + executionId;

        var fs = require('fs');

        fs.mkdir(executionFolder, function(err) {
            console.log(err);
            fs.writeFile(executionFolder + '/userFile', submission.code, function(err) {
                console.log(err);
                var executor = new Executor(self.logger);
                var executorOptions = _.defaults({
                    'Cmd': [
                        '/usr/bin/php',
                        'userFile'
                    ],
                    'Image': 'code-execution.php'
                }, defaultOptions);

                executor.init(executorOptions);

                var a = {
                    code: submission.code,
                    executionFolder: executionFolder
                };

                executor.initializeExecution(a, function (err) {
                    if (err) {
                        self.logger.info(err);
                    }

                    executor.execute(function(err, result) {
                        self.logger.info(result, 'Execution result');
                    });
                });
            });
        });
    }
};

module.exports = CodeExecutionService;
