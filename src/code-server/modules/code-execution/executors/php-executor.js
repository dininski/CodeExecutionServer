'use strict';

var BaseExecutor = require('./base-executor');
var util = require('util');

var PhpExecutor = function () {
    this.name = "Php Executor";
};

PhpExecutor.prototype = {
};

util.inherits(PhpExecutor, BaseExecutor);

module.exports = PhpExecutor;

