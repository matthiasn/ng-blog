'use strict';

angular.module('ngBlog.directives')
    .directive('codeblock', function ($http) {
        return {
            restrict: 'EA',
            scope: { src: "=src", mode: "=mode"  },
            link: function ($scope, elem, attrs) {
                $http({method: 'GET', url: $scope.src, cache: false}).then(function (res) {
                    var html ='<pre><code>' + hljs.highlight($scope.mode, res.data).value + '</pre></code>';
                    var e = $.parseHTML(html);
                    elem.replaceWith(e);
                });
            }
        }
    });
