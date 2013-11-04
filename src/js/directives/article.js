'use strict';
/** Codeblock directive, highlights syntax using highlight.js */
angular.module('ngBlog.directives')
    .directive('blogArticle', function() {
        return {
            restrict: 'EA',
            scope: { md: "=md", snippet: "=snippet" },
            templateUrl: "tpl/article.tpl.html",
            link: function ($scope, elem, attrs) {
                $scope.lines = [];


            }
        }
    });
