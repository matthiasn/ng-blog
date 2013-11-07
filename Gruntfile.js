module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: { options: { separator: ';' },
            dist: { src: [
                'src/js/vendor/jquery-1.10.2.min.js',
                'src/js/vendor/angular.min.js',
                'src/js/vendor/angular-route.min.js',
                'src/js/vendor/underscore.min.js',
                'src/js/vendor/underscore.string.js',
                'src/js/vendor/showdown.js',
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
        ngtemplates: { ngBlog:  { cwd: 'src', src: ['views/**.html', 'tpl/**.html'], dest: 'build/js/app.templates.js' } }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('dist', ['ngtemplates', 'karma', 'less', 'concat', 'targethtml', 'copy']);
};
