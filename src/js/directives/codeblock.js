'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('codeblock', function ($http, $timeout) {
        return {
            restrict: 'EA',
            scope: { snippet: "=snippet" },
            template: "<div class='codeblock'>"
                + "<pre><code class='language-{{ lang }}'>{{ code }}</code></pre><div style='top: {{ marker.top }}px; height: {{ marker.height }}px' class='marker'></div><div class='marker_description'>{{ marker.description }}</div></div>",
            link: function ($scope, elem, attrs) {

                $scope.$watch("snippet", function () {
                    $timeout(function() {  // find currentLine span from editor, scroll to that position

                        if ($scope.snippet) {
                            $http({method: 'GET', url: $scope.snippet.file, cache: false}).then(function (res) {
                                $scope.code = res.data
                                $scope.lang = $scope.snippet.lang;

                                $timeout(function() { hljs.highlightBlock(elem.find('pre code')[0]) });

                                var lineHeight = parseInt(elem.find('pre').css('line-height'));
                                var offset = 5;

                                $scope.marker = { top: 0, height: 0, description: "" };

                                function getPos(line) { return ((line - 1) * lineHeight) + offset; }
                                function getHeight(lines) {return lineHeight * lines + 1}

                                var currentMarker = 0;
                                function curr() { return currentMarker % $scope.snippet.markers.length; }
                                function next() {
                                    $scope.marker.top = getPos($scope.snippet.markers[curr()].line);
                                    $scope.marker.height = getHeight($scope.snippet.markers[curr()].height);
                                    $scope.marker.description = $scope.snippet.markers[curr()].description;
                                    currentMarker++;
                                    $timeout(next, $scope.snippet.markers[curr()].duration);
                                }
                                next();
                            });
                        }
                    });
                });
            }
        }
    });
