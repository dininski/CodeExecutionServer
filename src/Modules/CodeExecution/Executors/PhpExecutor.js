'use strict';

var BaseExecutor = require('./BaseExecutor')
var util = require('util');

var PhpExecutor = function () {
    this.name = "Php Executor";
}

PhpExecutor.prototype = {
}

util.inherits(PhpExecutor, BaseExecutor);

module.exports = PhpExecutor;

