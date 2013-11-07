'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('codeblock', function (resourceCache) {
        return {
            restrict: 'EA',
            scope: { src: "=src" },
            replace: true,
            template: "<div class='codeblock'>"
                + "<pre><code class='language-{{ mode }}'>{{ code.data }}</code></pre><div class='marker'></div></div>",
            link: function ($scope, elem, attrs) {
                $scope.code = resourceCache.getResource($scope.src, false);
                $scope.mode = attrs.mode;
                $scope.$watch("code.data", function() { hljs.highlightBlock(elem.find('pre code')[0]) });
            }
        }
    })
    .directive('hljs', function() {
        return {
            restrict: 'A',
            scope: { code: "=code" },
            replace: true,
            link: function ($scope, elem) {
                var render = function () { elem.html(hljs.highlightAuto($scope.code).value); };
                $scope.$watch("code", render);
            }
        }
    })
    .directive('snippet', function($timeout, resourceCache) {
        return {
            restrict: 'EA',
            scope: { snippet: "=snippet" },
            templateUrl: "tpl/snippet.tpl.html",
            link: function ($scope, elem) {
                $scope.$watch("snippet", function() {

                    $scope.code = resourceCache.getResource($scope.snippet.file, false);
                    $scope.$watch("code.data", function () {
                        $scope.codeRange = _.str.lines($scope.code.data).slice($scope.snippet.fromLine - 1,
                            $scope.snippet.toLine).join("\n");

                        $scope.marker = { top: 0, height: 0 };
                        $scope.commentBanner = { top: 0 };
                        var lineHeight = parseInt(elem.find('pre').css('line-height'));
                        var offset = 5;
                        var timeoutPromise;
                        var currentMarker = -1;
                        var lineOffset = $scope.snippet.fromLine;

                        $scope.control = {
                            playing: true,
                            symbol: function () {
                                if (this.playing) { return  "fa-pause"; }
                                else              { return "fa-play"; }
                            },
                            toggle: function () {
                                if (this.playing) { $timeout.cancel(timeoutPromise); }
                                else { timeoutPromise = $timeout($scope.next, $scope.snippet.markers[curr()].duration); }
                                this.playing = !this.playing;
                            }
                        };

                        function getPos(line) { return ((line - lineOffset) * lineHeight) + offset; }

                        function getCommentPos() {
                            var line = $scope.snippet.markers[curr()].line;
                            var height = $scope.snippet.markers[curr()].height;

                            if (line - lineOffset < 3) { return ((line + 0.3 + height - lineOffset) * lineHeight) + offset; }
                            else { return ((line - 1.5 - lineOffset) * lineHeight) + offset; }
                        }

                        function getHeight(lines) { return lineHeight * lines + 1 }
                        function curr() { return currentMarker % $scope.snippet.markers.length; }

                        function setMarker() {
                            $scope.marker.top = getPos($scope.snippet.markers[curr()].line) + "px";
                            $scope.marker.height = getHeight($scope.snippet.markers[curr()].height) + "px";
                            $scope.commentBanner.top = getCommentPos() + "px";
                            $scope.description = $scope.snippet.markers[curr()].description;
                        }

                        $scope.next = function () {
                            $timeout.cancel(timeoutPromise);
                            currentMarker++;
                            setMarker();
                            if ($scope.control.playing) {
                                timeoutPromise = $timeout($scope.next, $scope.snippet.markers[curr()].duration);
                            }
                        };
                        $scope.next();
                        $scope.prev = function () {
                            currentMarker--;
                            setMarker();
                        }
                    });



                });

            }
        }
    });
