module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'src/js/vendor/jquery-1.10.2.min.js',
            'src/js/vendor/angular.js',
            'src/js/vendor/angular-route.js',
            'src/js/vendor/ace.min.js',
            'src/js/vendor/ace-mode-markdown.min.js',
            'src/js/vendor/showdown.js',
            'test/lib/angular-mocks.js',
            'src/js/app.js',
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
