'use strict';

angular.module('ngBlog.directives')
    .directive('markdown', function ($compile, $timeout) {
        var converter = new Showdown.converter();
        return {
            restrict: 'A',
            scope: { md: "=md" },
            link: function ($scope, elem, attrs) {
                $scope.$watch("md.src", function () {
                    elem.empty().append($compile(converter.makeHtml($scope.md.src))($scope));

                    $timeout(function() {
                        var currentLine = document.getElementById('currentLine');
                        if (currentLine) {
                            var offset = currentLine.offsetTop;
                            elem.scrollTop(offset - 200);
                        }
                    }, 100);
                });
            }
        }
    });
