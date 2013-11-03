'use strict';
/** routes configuration for dist (no editing) */
angular.module('ngBlog').config(function ($locationProvider, $routeProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                redirectTo: '/blog/'
            })
            .when('/:cat', {
                templateUrl: 'views/blog.html',
                controller: 'blogCtrl'
            })
            .when('/:cat/:year/:month/:day/:title', {
                templateUrl: 'views/blog.html',
                controller: 'blogCtrl'
            })
            .otherwise({ redirectTo: '/' });
    });