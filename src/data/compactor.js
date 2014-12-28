'use strict';

var async = require('async');
var utilities = require('./utilities');

var processField = function(action, field, done) {
    var self = this;

    var fieldValue = this[field];
    action(fieldValue, function (err, val) {
        if (err) {
            return done(err);
        }

        self[field] = val;
        done();
    });
};

var compactAndDecompact = function(schema, fields) {
    schema.pre('save', function(next) {
        async.each(fields, processField.bind(this, utilities.deflateField), next);
    });

    schema.post('read', function(next) {
        async.each(fields, processField.bind(this, utilities.inflateField), next);
    });
};

module.exports = {
    compact: compactAndDecompact
};
