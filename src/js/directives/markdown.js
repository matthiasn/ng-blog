'use strict';

/** Markdown directive, converts Markdown String and renders the HTML inside the parent DIV
  * HTML is $compiled: AngularJS directives can be used inside the Markdown */
 angular.module('ngBlog.directives')
    .directive('markdown', ['$compile', 'showdown', function ($compile, showdown) {
        return {
            restrict: 'A',
            scope: { md: "=md", config: "=config" },
            link: function ($scope, elem) {
                var render = function () {
                    if ($scope.md) {
                        elem.empty().append($compile(showdown.makeHtml($scope.md))($scope));
                    }
                };
                $scope.$watch("md",  render);
                $scope.$watch("config", render);
            }
        };
    }]);
