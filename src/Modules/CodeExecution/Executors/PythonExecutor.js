'use strict';

var BaseExecutor = require('./BaseExecutor')
var util = require('util');

var PythonExecutor = function () {
    this.name = "Python Executor";
}

PythonExecutor.prototype = {
}

util.inherits(PythonExecutor, BaseExecutor);

module.exports = PythonExecutor;