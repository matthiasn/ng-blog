'use strict';

angular.module('ngBlog.controllers', []).controller('blogCtrl', function ($scope, $http, $location, $timeout, $routeParams) {
    $scope.markdown = { src: "" };
    var r = $routeParams;
    if (r.cat) {
        $scope.url = r.cat;
        if (r.title) { $scope.url = $scope.url + '/posts/' + r.year + '-' + r.month + '-' + r.day + '-' + r.title + '.md'; }
        else { $scope.url = $scope.url + '/index.md'; }

        $http({method: 'GET', url: $scope.url, cache: false})
            .then(function (res) {
                $scope.markdown.src = res.data;
                $scope.markdown.lastEditFromAce = false;
            }, function () {
                $scope.markdown = { src: "#Sorry  \n There seems to be nothing at that address." };
                $timeout(function () {
                    $location.url("/");
                }, 3000);
            });
    }
});
