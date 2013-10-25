'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('codeblock', function ($http) {
        return {
            restrict: 'EA',
            scope: { src: "=src" },
            link: function ($scope, elem, attrs) {
                $http({method: 'GET', url: $scope.src, cache: false}).then(function (res) {
                    var html ='<pre><code>' + hljs.highlight(attrs.mode, res.data).value + '</pre></code>';
                    var e = $.parseHTML(html);
                    elem.replaceWith(e);
                });
            }
        }
    });
