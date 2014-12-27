'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    _id: String,
    Description: String
});

mongoose.model('Task', TaskSchema);
