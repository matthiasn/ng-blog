'use strict';

angular.module('ngBlog.controllers', [])
    .controller('blogCtrl', function ($scope, $http, $location, $timeout, $routeParams) {
        $scope.markdown = { src: "" };

        $scope.load = function() {
            if($scope.url) {
                $http({method: 'GET', url: $scope.url + '.md', cache: false})
                    .then(function (res) {
                        $scope.markdown.src = res.data;
                        $scope.markdown.url = $scope.url;
                        $scope.markdown.lastEditFromAce = false;
                    }, function (err) {
                        $scope.markdown = { src: "#Sorry  \n There seems to be nothing at that address." };
                        console.log(err)
                        $timeout(function () {
                             $location.url("/");
                        }, 3000);
                    }
                );
            }
        };

        var es = new EventSource("/sse");
        es.onmessage = function (event) {
            console.log(event.data);
            $scope.load();
        };

        var r = $routeParams;
        if (r.cat) {
            $scope.url = r.cat;
            if (r.title) {
                $scope.url = $scope.url + '/posts/' + r.year + '-' + r.month + '-' + r.day + '-' + r.title;
            }
            else { $scope.url = $scope.url + '/index'; }
            $scope.load();
        }
    });
