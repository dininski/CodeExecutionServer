'use strict';

define([
        'angular',
        'uiRouter',
        'components/base/base',
        'ngAria',
        'ngAnimate',
        'ngMaterial'
    ],
    function (angular) {
        var codeFrontend = angular.module('codeFrontend', ['ui.router', 'codeFrontend.base', 'ngAnimate', 'ngMaterial', 'ngAria']);
        return codeFrontend;
    }
);
