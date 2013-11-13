module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: { dist: { files: { 'dist/js/<%= pkg.name %>.min.js': [
            'src/bower_components/jquery/jquery.min.js',
            'src/bower_components/angular/angular.min.js',
            'src/bower_components/angular-route/angular-route.min.js',
            'src/bower_components/underscore/underscore.js',
            'src/bower_components/underscore.string/dist/underscore.string.min.js',
            'src/bower_components/showdown/compressed/showdown.js',
            'src/js/vendor/highlight.pack.js',
            'src/js/app.js',
            'src/js/routes.js',
            'src/js/services/showdown.js',
            'src/js/services/resource-cache.js',
            'src/js/controllers.js',
            'build/js/app.templates.js',
            'src/js/directives/*.js' ] } } },
        watch:       { jshint:  { files: ['src/**/*'], tasks: ['jshint'], options: { spawn: false } } },
        targethtml:  { dist:    { files: { 'build/index.html': 'src/index.html'} } },
        karma:       { unit:    { configFile: 'conf/karma.conf.js', singleRun: false },
                       dist:    { configFile: 'conf/karma.conf.js', singleRun: true }},
        less:        { dist:    { files: { "build/css/main.css": "src/less/custom.less" } } },
        concurrent:  { dev:     { tasks: ['watch', 'karma:unit'], options: { logConcurrentOutput: true } } },
        ngtemplates: { ngBlog:  { cwd: 'src', src: ['views/**.html', 'tpl/**.html'], dest: 'build/js/app.templates.js' } },
        jshint:      { options: { jshintrc: '.jshintrc' },
                       files:   { src: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/vendor/*.js', 'scripts/server.js'] } },
        cssmin:      { minify:  { expand: true,  cwd: 'build/css/', src: 'main.css', dest: 'build/css/', ext: '.min.css',
                                  options: { keepSpecialComments: 0 } } },
        compress:    { main:    { options: { mode: 'gzip' }, expand: true,
                       src:       [ 'dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html', 'dist/**/*.json', 'dist/**/*.md',
                                    'dist/**/*.svg', 'dist/**/*.ttf', 'dist/**/*.otf' ], dest: '.' } },
        copy:        { main:    { files: [ { expand: true, cwd: 'src',  src: ['fonts/**'], dest: 'dist/'},
                                           { expand: true, cwd: 'src',  src: ['img/**'], dest: 'dist/'},
                                           { expand: true, cwd: 'src',  src: ['blog/**'],  dest: 'dist/'} ] } },
        htmlbuild:   { dist:    { src: 'build/index.html', dest: 'build/index-inline.html',
                                  options: { relative: true, styles: { bundle: 'build/css/main.min.css' } } } },
        htmlmin:     { dist:    { options: { removeComments: true, collapseWhitespace: true },
                                  files:   { 'dist/index.html': 'build/index-inline.html' } } }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('dist', ['ngtemplates', 'jshint', 'karma:dist', 'less', 'uglify', 'targethtml',
        'copy', 'cssmin', 'htmlbuild', 'htmlmin', 'compress']);
    grunt.registerTask('default', ['concurrent:dev']);
};
