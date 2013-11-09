module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            'src/bower_components/jquery/jquery.js',
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular-route/angular-route.js',
            'src/bower_components/underscore/underscore.js',
            'src/bower_components/underscore.string/lib/underscore.string.js',
            'src/bower_components/showdown/src/showdown.js',
            'src/bower_components/angular-mocks/angular-mocks.js',
            'src/js/app.js',
            'build/js/app.templates.js',
            'src/js/routes.js',
            'src/js/services/resource-cache.js',
            'src/js/services/showdown.js',
            'src/js/controllers.js',
            'src/js/directives/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: ['karma-chrome-launcher', 'karma-jasmine']
    })
};
