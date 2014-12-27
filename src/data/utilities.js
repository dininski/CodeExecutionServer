'use strict';

var zlib = require('zlib');

module.exports = {
    deflateField: function (field, callback) {
        zlib.deflate(field, function (err, buffer) {
            if (err) {
                return callback(err);
            }

            field = buffer;
            callback();
        });
    },
    inflateField: function (field, callback) {
        zlib.inflate(field, function (err, buffer) {
            if (err) {
                return callback(err);
            }

            field = buffer.toString('base64');
            callback();
        });
    }
};
