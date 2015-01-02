'use strict';

define([],
    function () {
        var injects = ['$scope'];

        var BaseController = function ($scope) {
            $scope.menuItems = [
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                },
                {
                    Title: 'Main'
                }
            ];

        };

        BaseController.$injects = injects;

        return BaseController;
    }
);
