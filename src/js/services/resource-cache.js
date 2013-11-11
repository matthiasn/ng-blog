'use strict';

/** resource cache service, loads resources once and then provides cached version
 *  also allows refreshing specific resources */
angular.module('ngBlog.services').factory('resourceCache', ['$http', function ($http) {
    var exports = {};
    var cache = {};

    var loadResource = function(url) {
        $http({method: 'GET', url: url, cache: false}).then(function (res) {
            cache[url].data = res.data;
            if (res.data.hasOwnProperty("preload")) {
                _.each(res.data.preload, function(item) { exports.getResource(item, _.str.endsWith("json")); });
            }
        });
    };

    exports.getResource = function(url, expectObject) {
        if (!cache.hasOwnProperty(url)) {
            if (expectObject) { cache[url] = { url: url, data: { snippets: {}, images: {}} }; }
            else              { cache[url] = { url: url, data: "" }; }
            loadResource(url);
        }
        return cache[url];
    };

    exports.refresh = function(url) { loadResource(url); };

    return exports;
}]);
