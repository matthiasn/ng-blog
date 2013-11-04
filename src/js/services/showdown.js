'use strict';

/** resource cache service, loads resources once and then provides cached version
 *  also allows refreshing specific resources */
angular.module('ngBlog.services').factory('showdown', function () {
    return new Showdown.converter();  // Markdown -> HTML converter
});
