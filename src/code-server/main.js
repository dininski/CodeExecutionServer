'use strict';

require('longjohn');
var CodeExecutionServer = require('./server');
var server = new CodeExecutionServer();

server.start();