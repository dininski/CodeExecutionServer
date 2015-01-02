'use strict';

require.config({
    paths: {
        // TODO: move to CDN
        angular: 'bower_components/angular/angular',
        uiRouter: 'bower_components/ui-router/release/angular-ui-router',
        ngMaterial: 'assets/js/angular-material',
        hammerjs: 'assets/js/hammer-proxy',
        ngAnimate: 'assets/js/angular-animate',
        ngAria: 'assets/js/angular-aria',
        hammerLib: 'bower_components/hammerjs/hammer'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: {
            exports: 'uiRouter',
            deps: ['angular']
        },
        ngAnimate: {
            exports: 'ngAnimate',
            deps: ['angular']
        },
        ngAria: {
            exports: 'ngAria',
            deps: ['angular']
        },
        ngMaterial: {
            exports: 'ngMaterial',
            deps: ['angular', 'ngAria', 'ngAnimate', 'hammerjs']
        }
    },
    waitSeconds: 0
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'app'
], function (angular, app) {
    angular.element().ready(function () {
        angular.resumeBootstrap([app.name]);
    });
});
