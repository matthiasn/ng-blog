'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('codeblock', function ($http, $timeout) {
        return {
            restrict: 'EA',
            scope: { src: "=src" },
            template: "<div class='codeblock'>"
                + "<pre><code class='language-{{ mode }}'>{{ code }}</code></pre><div class='marker'></div></div>",
            link: function ($scope, elem, attrs) {
                $http({method: 'GET', url: $scope.src, cache: false}).then(function (res) {
                    $scope.code = res.data
                    $scope.mode = attrs.mode;

                    $timeout(function() { hljs.highlightBlock(elem.find('pre code')[0]) }, 0);

                    var lineHeight = parseInt(elem.find('pre').css('line-height'));
                    var offset = 5;

                    function getPos(line) { return (((line - 1) * lineHeight) + offset) + "px"; }

                    $timeout(function() { elem.find('.marker').css({top: getPos(2)}); }, 1000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(3)}); }, 2000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(4)}); }, 3000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(5)}); }, 4000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(6), height: "36px"}); }, 5000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(7)}); }, 6000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(8)}); }, 7000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(9), height: "18px"}); }, 8000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(12)}); }, 9000);
                    $timeout(function() { elem.find('.marker').css({top: getPos(15), height: "72px"}); }, 10000);
                });
            }
        }
    });
