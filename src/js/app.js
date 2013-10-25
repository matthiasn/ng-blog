'use strict';

/** app level module which depends on services and controllers */

angular.module('ngBlog.directives', []);

angular.module('ngBlog', ['ngBlog.controllers', 'ngBlog.directives', 'ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        //$locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                redirectTo: '/blog/'
            })
            .when('/:cat', {
                templateUrl: '/views/blog.html',
                controller: 'blogCtrl'
            })
            .when('/:cat/:year/:month/:day/:title', {
                templateUrl: '/views/blog.html',
                controller: 'blogCtrl'
            })
            .when('/edit/:cat/:year/:month/:day/:title', {
                templateUrl: '/views/edit.html',
                controller: 'blogCtrl'
            })
            .when('/edit', {
                templateUrl: '/views/edit.html',
                controller: 'blogCtrl'
            })
            .otherwise({ redirectTo: '/' });
    });
