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

                    $timeout(function() {
                        hljs.highlightBlock(elem.find('pre code')[0])
                    }, 0);

                    var lineHeight = $('.marker').css('line-height');

                    $timeout(function() { elem.find('.marker').css({top: "20px"}); }, 1000);
                    $timeout(function() { elem.find('.marker').css({top: "40px"}); }, 2000);
                    $timeout(function() { elem.find('.marker').css({top: "60px"}); }, 3000);
                    $timeout(function() { elem.find('.marker').css({top: "80px"}); }, 4000);
                    $timeout(function() { elem.find('.marker').css({top: "100px"}); }, 5000);
                    $timeout(function() { elem.find('.marker').css({top: "120px"}); }, 6000);
                    $timeout(function() { elem.find('.marker').css({top: "140px"}); }, 7000);
                    $timeout(function() { elem.find('.marker').css({top: "160px"}); }, 8000);
                });
            }
        }
    });
