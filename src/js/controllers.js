'use strict';

angular.module('ngBlog.controllers', [])
    .controller('blogCtrl', function ($scope, $routeParams, resourceCache) {
        var r = $routeParams;
        if (r.cat) {
            $scope.url = r.cat;
            if (r.title) {
                $scope.url = $scope.url + '/posts/' + r.year + '-' + r.month + '-' + r.day + '-' + r.title;
            }
            else { $scope.url = $scope.url + '/index'; }
            $scope.markdown = resourceCache.getResource($scope.url + ".md", false);
            $scope.snippets = resourceCache.getResource($scope.url + ".json", true);


            console.log($scope.markdown)
            console.log($scope.snippets)
        }
    });
