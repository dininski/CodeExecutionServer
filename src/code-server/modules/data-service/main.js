'use strict';

module.exports = function (options, imports, register) {
    var DataService = require('./data-service');

    register(null, {
        dataService: DataService
    });
};
