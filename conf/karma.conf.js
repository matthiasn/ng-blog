module.exports = function(config){
    config.set({
    basePath : '../',
    files : [
      'src/js/vendor/angular.js',
      'src/js/vendor/angular-route.js',
      'src/js/vendor/ace.min.js',
      'src/js/vendor/ace-mode-markdown.min.js',
      'src/js/vendor/jquery-1.10.2.min.js',
      'test/lib/angular-mocks.js',
      'src/js/**/*.js',
      'test/unit/**/*.js'
    ],
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : ['karma-chrome-launcher', 'karma-jasmine']
})};
