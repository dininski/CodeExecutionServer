'use strict';

module.exports = function (options, imports, register) {
    var Data = require('./Data');
    var Models = new Data();

    register(null, {
        Data: Models
    });
};
