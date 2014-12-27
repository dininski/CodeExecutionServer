'use strict';

module.exports = {
    rangeValidator: function (range) {
        return function(value) {
            return range.indexOf(value) !== -1;
        };
    }
};
