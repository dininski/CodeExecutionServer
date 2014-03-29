'use strict';

var Routing = function () {
}

Routing.prototype = {
    registerRoutes: function (httpServer) {
        httpServer.registerRoute({
            method: 'post',
            path: '/code',
            handler: this.handleCodeExecuteRequest.bind(this)
        });
    },

    handleCodeExecuteRequest: function (req, res, next) {
        // TODO - handle code execution request
    }
}

module.exports = Routing;