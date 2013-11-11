'use strict';

/**
 *  Triggers reload of resource in resourceCache upon notification of file change coming in through SSE connection.
 *  Also refreshes page layout when server-side LESS is updated.
 **/
angular.module('ngBlog.services').run(function (resourceCache) {
    var sse = new EventSource("/sse");
    sse.onmessage = function (event) {
        if (_.str.endsWith(event.data, ".less")) { less.refresh(); } // refresh LESS, rebuild site CSS
        else { resourceCache.refresh(event.data); }                  // refresh other resources (e.g. markdown, JSON)
    };
});
