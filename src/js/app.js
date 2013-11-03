'use strict';

/** app level module which depends on services and controllers */
angular.module('ngBlog.directives', []);
angular.module('ngBlog.services', []);
angular.module('ngBlog', ['ngBlog.controllers', 'ngBlog.services', 'ngBlog.directives', 'ngRoute']);
