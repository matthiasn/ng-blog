'use strict';
describe('spec for markdown directive', function () {
    beforeEach(module('ngBlog.services'));
    beforeEach(module('ngBlog.directives'));
    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        $scope.markdown = "#TEST HEADLINE";
    }));

    describe('when provided with valid markdown', function () {
        it('should contain compiled text', function () {
            inject(function ($compile) {
                var element = $compile('<div markdown md="markdown"></div>')($scope);
                $scope.$digest();
                expect(element.html()).toContain('TEST HEADLINE');
            });
        });
    });
});

describe('spec for teasers directive', function () {
    beforeEach(module('ngBlog'));           // also loads $templateCache from app.templates.js
    beforeEach(module('ngBlog.services'));
    beforeEach(module('ngBlog.directives'));
    var $scope;
    beforeEach(inject(function ($rootScope, $templateCache) {

        $scope = $rootScope.$new();
        $scope.config = {
            "teasers": [
                {
                    "title": "Title",
                    "href": "blog/2013/11/09/preview/",
                    "date": "Nov 9th, 2013",
                    "text": "**Teaser** text"
                }
            ]
        };
    }));

    describe('when provided with valid markdown', function () {
        it('should contain compiled text', function () {
            inject(function ($compile) {
                var element = $compile('<div teasers config="config"></div>')($scope);
                $scope.$digest();
                expect(element.html()).toContain('<strong>Teaser</strong>');
            });
        });
    });
});
