'use strict';

var SimpleStream = function () {
    this.value = '';
};

SimpleStream.prototype = {
    write: function (data) {
        this.value += data.toString();
    }
};

module.exports = SimpleStream;