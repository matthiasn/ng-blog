module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: { options: { separator: ';' },
            dist: { src: [
                'src/bower_components/jquery/jquery.min.js',
                'src/bower_components/angular/angular.min.js',
                'src/bower_components/angular-route/angular-route.min.js',
                'src/bower_components/underscore/underscore.min.js',
                'src/bower_components/underscore.string/dist/underscore.string.min.js',
                'src/bower_components/showdown/compressed/showdown.js',
                'src/js/vendor/highlight.pack.js',
                'src/js/app.js',
                'src/js/routes.js',
                'src/js/services/showdown.js',
                'src/js/services/resource-cache.js',
                'build/js/app.templates.js',
                'src/js/controllers.js',
                'src/js/directives/*.js'
            ], dest: 'dist/js/<%= pkg.name %>.js' } },

        copy: {
            main: { files: [
                { expand: true, cwd: 'src',  src: ['fonts/**'], dest: 'dist/'},
                { expand: true, cwd: 'src',  src: ['blog/**'],  dest: 'dist/'} ] }
        },

        watch: { less:    { files: ['src/**/*.less'], tasks: ['less'],           options: { spawn: false } },
                 scripts: { files: ['src/**/*.js'],   tasks: ['karma','concat'], options: { spawn: false } },
                 dist:    { files: ['dist/**'],   tasks: ['copy:nginx'],         options: { spawn: true } }
        },
        targethtml:  { dist:    { files: { 'dist/index.html': 'src/index.html'} } },
        karma:       { unit:    { configFile: 'conf/karma.conf.js', singleRun: true } },
        less:        { dist:    { files: { "dist/css/main.css": "src/less/custom.less" } } },
        ngtemplates: { ngBlog:  { cwd: 'src', src: ['views/**.html', 'tpl/**.html'], dest: 'build/js/app.templates.js' } },

        compress: { main: { options: { mode: 'gzip' }, expand: true,
            src: ['dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html', 'dist/**/*.json', 'dist/**/*.md',
                  'dist/**/*.svg', 'dist/**/*.ttf', 'dist/**/*.otf'], dest: '.' } }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('dist', ['ngtemplates', 'karma', 'less', 'concat', 'targethtml', 'copy', 'compress']);
};
