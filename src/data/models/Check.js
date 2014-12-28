'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var compactor = require('../compactor');

var async = require('async');

var CheckSchema = new Schema({
    stdin: Buffer,
    expectedStdOut: Buffer,
    expectedStdErr: Buffer,
    task_id: String
});

compactor.compact(CheckSchema, ['stdin', 'expectedStdOut', 'expectedStdErr']);

mongoose.model('Check', CheckSchema);
