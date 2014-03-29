'use strict';

var BaseExecutor = require('BaseExecutor')
var util = require('util');

var PythonExecutor = function() {
}

util.inherits(PythonExecutor, BaseExecutor);

PythonExecutor.prototype = {
    run: function(code, stdin, done) {

    }
}
