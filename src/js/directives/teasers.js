'use strict';

/** Teasers directive */
 angular.module('ngBlog.directives')
    .directive('teasers', function ($compile, showdown) {
        return {
            restrict: 'A',
            scope: { config: "=config" },
            templateUrl: "tpl/teasers.tpl.html",
            link: function ($scope, elem) {

//                var render = function () {
//                    elem.empty().append($compile(showdown.makeHtml($scope.md.data))($scope));
//                };
//                $scope.$watch("md.data",  render);
                var render = function() {

                    console.log()
                };

                $scope.$watch("config.data", render);
            }
        }
    });
