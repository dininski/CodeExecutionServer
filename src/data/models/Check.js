'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utilities = require('../utilities');

var async = require('async');

var CheckSchema = new Schema({
    stdin: Buffer,
    expectedStdOut: Buffer,
    expectedStdErr: Buffer,
    task_id: String
});

CheckSchema.pre('save', function (next) {
    var self = this;

    async.parallel(
        [
            function deflateStdIn(callback) {
                utilities.deflateField(self.stdin, callback);
            },
            function deflateStdOut(callback) {
                utilities.deflateField(self.expectedStdOut, callback);
            },
            function deflateStdErr(callback) {
                utilities.deflateField(self.expectedStdErr, callback);
            }
        ],
        next
    );
});

CheckSchema.post('read', function (next) {
    var self = this;

    async.parallel(
        [
            function inflateStdIn(callback) {
                utilities.inflateField(self.stdin, callback);
            },
            function inflateStdOut(callback) {
                utilities.inflateField(self.expectedStdOut, callback);
            },
            function inflateStdErr(callback) {
                utilities.inflateField(self.expectedStdErr, callback);
            }
        ],
        next
    );
});

mongoose.model('Check', CheckSchema);
