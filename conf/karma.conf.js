module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'src/js/vendor/jquery-1.10.2.min.js',
            'src/js/vendor/angular.js',
            'src/js/vendor/angular-route.js',
            'src/js/vendor/showdown.js',
            'test/lib/angular-mocks.js',
            'src/js/app.js',
            'src/js/routes.js',
            'src/js/services/showdown.js',
            'src/js/services/resource-cache.js',
            'src/js/controllers.js',
            'build/js/app.templates.js',
            'src/js/directives/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: ['karma-chrome-launcher', 'karma-jasmine']
    })
};
