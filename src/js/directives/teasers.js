'use strict';

/** Teasers directive */
 angular.module('ngBlog.directives')
    .directive('teasers', function () {
        return {
            restrict: 'A',
            scope: { config: "=config" },
            templateUrl: "tpl/teasers.tpl.html"
        };
    });
