'use strict';

var BaseExecutor = require('./BaseExecutor')
var util = require('util');

var PythonExecutor = function() {
}

PythonExecutor.prototype = {
    init: function(containerFactory, createOpts, runOpts) {
        BaseExecutor.prototype.init.call(this, containerFactory, createOpts, runOpts);
    }
}

util.inherits(PythonExecutor, BaseExecutor);

module.exports = PythonExecutor;

