'use strict';

var zlib = require('zlib');

module.exports = {
    deflateField: function (field, callback) {
        zlib.deflate(field, function (err, buffer) {
            if (err) {
                return callback(err);
            }

            callback(null, buffer);
        });
    },
    inflateField: function (field, callback) {
        zlib.inflate(field, function (err, buffer) {
            if (err) {
                return callback(err);
            }

            var stringValue = buffer.toString('base64');
            callback(null, stringValue);
        });
    }
};
