'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('codeblock', function ($http, $timeout) {
        return {
            restrict: 'EA',
            scope: { src: "=src" },
            template: "<div class='codeblock'>"
                + "<pre><code class='language-{{ mode }}'>{{ code }}</code></pre><div style='top: {{ marker.top }}px; height: {{ marker.height }}px' class='marker'></div><div class='marker_description'>{{ marker.description }}</div></div>",
            link: function ($scope, elem, attrs) {
                $http({method: 'GET', url: $scope.src, cache: false}).then(function (res) {
                    $scope.code = res.data
                    $scope.mode = attrs.mode;

                    $timeout(function() { hljs.highlightBlock(elem.find('pre code')[0]) }, 0);

                    var lineHeight = parseInt(elem.find('pre').css('line-height'));
                    var offset = 5;

                    $scope.marker = { top: 0, height: 0, description: "" };

                    function getPos(line) { return ((line - 1) * lineHeight) + offset; }
                    function getHeight(lines) {return lineHeight * lines + 1}

                    var currentMarker = 0;
                    var markers = [
                        { line: 1, height: 3, duration: 2000, description: "Something is happening in line 4" },
                        { line: 8, height: 7, duration: 4000, description: "line 8" },
                        { line: 13, height: 2, duration: 2000, description: "wow, look at line 13" },
                        { line: 6, height: 5, duration: 3000, description: "cool stuff in line 6" },
                        { line: 9, height: 3, duration: 2000, description: "line 9 is interesting, too" },
                    ];

                    function curr() { return currentMarker % markers.length; }
                    function next() {
                        $scope.marker.top = getPos(markers[curr()].line);
                        $scope.marker.height = getHeight(markers[curr()].height);
                        $scope.marker.description = markers[curr()].description;
                        currentMarker++;
                        $timeout(next, markers[curr()].duration);
                    }
                    next();
                });
            }
        }
    });
