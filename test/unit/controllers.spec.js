'use strict';
describe('controller specs', function () {
    var $scope;
    var $routeParams = { cat: "blog", year: "2013", month: "10", day: "24", title: "test" };
    var $httpBackend;
    var expectedUrl = "blog/posts/2013-10-24-test.md";

    beforeEach(module('ngBlog.controllers'));

    beforeEach(inject(function ($injector, $rootScope, $controller, _$httpBackend_) {
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', expectedUrl).respond("#This is a test headline");
        $controller('blogCtrl', { $scope: $scope, $routeParams: $routeParams });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create expected "url" and issue GET request', function () {
        expect($scope.url).toBe(expectedUrl);
        $httpBackend.expectGET(expectedUrl);
        $httpBackend.flush();
    });
});
