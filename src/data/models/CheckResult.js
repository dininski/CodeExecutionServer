'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;
var validators = require('../validators');

var CheckResultSchema = new Schema({
    stdOut: Buffer,
    stdErr: Buffer,
    executionResult: Number,
    isCorrect: Boolean,
    check_id: ObjectId,
    submission_id: ObjectId
});

var executionResultsMap = {
    success: 0,
    error: 1,
    memoryLimit: 2,
    timeLimit: 3
};

var executionResults = _.values(executionResultsMap);

CheckResultSchema
    .path('executionResult')
    .validate(validators.rangeValidator(executionResults), 'Invalid execution result!');

mongoose.model('CheckResult', CheckResultSchema);
