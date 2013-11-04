'use strict';

/**
 *  triggers reload of resource in resourceCache upon notification of file change coming in through SSE connection
 **/
angular.module('ngBlog.services').run(function (resourceCache) {
    var sse = new EventSource("/sse");
    sse.onmessage = function (event) {
        resourceCache.refresh(event.data);
    };
});
