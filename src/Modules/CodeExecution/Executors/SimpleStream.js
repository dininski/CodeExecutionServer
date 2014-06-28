'use strict';

var StreamMock = function () {
    this.value = '';
};

StreamMock.prototype = {
    write: function (data) {
        this.value += data.toString();
    }
};

module.exports = StreamMock;