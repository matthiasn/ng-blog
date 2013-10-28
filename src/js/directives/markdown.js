'use strict';

/** Markdown directive, converts Markdown String and renders the HTML inside the parent DIV
  * HTML is $compiled: AngularJS directives can be used inside the Markdown */
 angular.module('ngBlog.directives')
    .directive('markdown', function ($compile, $timeout) {
        var converter = new Showdown.converter();  // Markdown -> HTML converter
        return {
            restrict: 'A',
            scope: { md: "=md" },
            link: function ($scope, elem, attrs) {
                $scope.$watch("md.src", function () {
                    elem.empty().append($compile(converter.makeHtml($scope.md.src))($scope));
                });

                $scope.hl = {line: 1}

                $scope.$watch("md.currentRow", function () {
                    $timeout(function() {  // find currentLine span from editor, scroll to that position
                        var currentLine = document.getElementById('row-' + $scope.md.currentRow);
                        if (currentLine) {
                            var offset = currentLine.offsetTop;
                            elem.scrollTop(offset - 200);
                        }
                    }, 100);
                });
            }
        }
    });
