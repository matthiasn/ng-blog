'use strict';
/** routes configuration for dist (no editing) */
angular.module('ngBlog').config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

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
    }]);
