'use strict';

/** routes configuration for edit mode */
angular.module('ngBlog').config(function ($locationProvider, $routeProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/edit/:cat/:year/:month/:day/:title', {
                templateUrl: 'views/edit.html',
                controller: 'blogCtrl'
            })
            .when('/edit', {
                templateUrl: 'views/edit.html',
                controller: 'blogCtrl'
            })
    });
