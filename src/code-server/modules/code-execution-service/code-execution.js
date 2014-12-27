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
        submission.code = "<?php\
        function solve() {\
            // Read input data\
            $X = (float) fgets(STDIN);\
            $Y = (float) fgets(STDIN);\
            // Solve the problem\
            if ($X == 0 && $Y == 0) {\
                return 0;\
            } else if ($X == 0) {\
                return 5;\
            } else if ($Y == 0) {\
                return 6;\
            } else if ($X > 0 && $Y > 0) {\
                return 1;\
            } else if ($X < 0 && $Y > 0) {\
                return 2;\
            } else if ($X < 0 && $Y < 0) {\
                return 3;\
            } else {\
                return 4;\
            }\
        }\
        echo solve();\
        ?>";

        var executor = new Executor(self.logger);
        var executorOptions = _.defaults({
            'Cmd': [
                '/usr/bin/php',
                'userFile'
            ],
            'Image': 'code-execution.php'
        }, defaultOptions);

        executor.init(executorOptions);

        executor.initializeExecution(submission, function(err) {
            if(err) {
                self.logger.info(err)
            }
        });

        //Submission.findOneAndUpdate({state: 0}, {state: 1}, null, function (err, submission) {
        //
        //});
        //}, 1000);
    }
};

module.exports = CodeExecutionService;
