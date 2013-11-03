'use strict';

/** resource cache service, loads resources once and then provides cached version
 *  also allows refreshing specific resources */
angular.module('ngBlog.services').factory('resourceCache', function ($http) {
    var exports = {};
    var cache = {};

    var loadResource = function(url) {
        $http({method: 'GET', url: url, cache: false}).then(function (res) { cache[url].data = res.data; });
    };

    exports.getResource = function(url, expectObject) {
        if (!cache.hasOwnProperty(url)) {
            if (expectObject) { cache[url] = { url: url, data: {} }; }
            else              { cache[url] = { url: url, data: "" }; }
            loadResource(url);
        }
        return cache[url];
    };

    exports.refresh = function(url) { loadResource(url); };

    var sse = new EventSource("/sse");
    sse.onmessage = function (event) { loadResource(event.data); };

    return exports;
});
