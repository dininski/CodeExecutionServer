'use strict';

define(function(require) {
    var angular = require('angular');
    var baseModule = angular.module('codeFrontend.base', []);
    var BaseController = require('components/base/partials/base-controller');

    baseModule.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('base', {
            url: '',
            templateUrl: 'components/base/partials/base.html',
            controller: 'BaseController'
        });
    }]);

    baseModule.controller('BaseController', BaseController);

    return baseModule;
});
