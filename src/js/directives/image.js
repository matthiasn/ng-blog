'use strict';
/** Image directive, loads appropriate image depending on size.
 *  Currently 3 sizes: normal, 600 pixels wide and 1600 pixels wide.
 *  Usage: e.g. <span image="config.data.images.screenshot1" />
 *  Element type not important, enclosing will be replaced
 */
angular.module('ngBlog.directives')
    .directive('image', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            scope: { image: "=image" },
            templateUrl: "tpl/figure.tpl.html",
            replace: true,
            link: function ($scope, elem) {
                // assign height style from cached configuration to avoid scroll issue in edit mode
                if ($scope.hasOwnProperty("image") && $scope.image.height > 0) {
                    $scope.style = { height: $scope.image.height + "px" };
                } else {
                    $timeout(function() {
                        var height = elem.height();
                        if (height > 0) { $scope.image.height = height; } // set element height in figure configuration
                    }, 3000);
                }

                var file = $scope.image.src.split('.');
                var suffix = "";
                if (window.devicePixelRatio) {
                    var width = window.devicePixelRatio * window.innerWidth;
                    if (width < 650) { suffix = "-600"; }
                    if (width > 1200) { suffix = "-1600"; }
                }
                $scope.src = file[0] + suffix + '.' + file[1];
            }
        };
    }]);
