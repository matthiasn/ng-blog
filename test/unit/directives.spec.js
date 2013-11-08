'use strict';
describe('spec for markdown directives', function () {
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
