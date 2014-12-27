'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    _id: String,
    description: String,
    memoryLimit: Number,
    timeLimit: Number
});

mongoose.model('Task', TaskSchema);
