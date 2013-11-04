'use strict';
/** Image directive, loads appropriate image depending on size.
 *  Currently 3 sizes: normal, 600 pixels wide and 1600 pixels wide.
 *  Usage:  <div image name='blog/images/test.jpg'></div>
 */
angular.module('ngBlog.directives')
    .directive('image', function () {
        return {
            restrict: 'EA',
            scope: {},
            template: "<img src='{{src}}' >",
            link: function ($scope, elem, attrs) {
                var file = attrs.name.split('.');
                var suffix = "";

                if (window.devicePixelRatio) {
                    var width = window.devicePixelRatio * window.innerWidth;
                    if (width < 650) { suffix = "-600"; }
                    if (width > 1200) { suffix = "-1600"; }
                }

                $scope.src = "blog/images/" + file[0] + suffix + '.' + file[1];

                console.log($scope.src)
            }
        }
    });
