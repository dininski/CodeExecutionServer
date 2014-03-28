'use strict';

var Routing = function () {
}

Routing.prototype = {
    registerRoutes: function (httpServer) {
        httpServer.registerRoute({
            method: 'post',
            path: '/code/execute',
            handler: this.handleCodeExecuteRequest.bind(this)
        });
    },

    handleCodeExecuteRequest: function (req, res, next) {
        console.log(123);
        res.send('Received!');
    }
}

module.exports = Routing;