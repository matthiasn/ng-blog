ng-blog
=======

This is ng-blog, a blog engine based on AngularJS for creating a self-hosted blog. It borrows from Octopress in the way that it

* can be hosted anywhere, not bound to any provider
* there is no database involved, only static files are served, which scales beautifully
* articles are written in markdown

However, a few things are substantially different:

* the pages themselves are not static, instead ng-blog is a single page application based on AngularJS
* it comes with an authoring tool with a live preview
* it is easy to extend, any custom directive can be used directly in the markdown

