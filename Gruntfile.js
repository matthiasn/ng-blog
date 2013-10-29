module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'src/js/vendor/jquery-1.10.2.min.js',
                    'src/js/vendor/angular.min.js',
                    'src/js/vendor/angular-route.js',
                    'src/js/vendor/showdown.js',
                    'src/js/vendor/highlight.pack.js',
                    'src/js/vendor/underscore.js',
                    'src/js/vendor/underscore.string.js',
                    //'src/js/vendor/ace.min.js',
                    //'src/js/vendor/ace-mode-markdown.min.js',
                    'src/js/app.js',
                    'build/js/app.templates.js',
                    'src/js/routes.js',
                    'src/js/controllers.js',
                    'src/js/directives/*.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: ['fonts/**'], dest: 'dist/'},
                    {expand: true, cwd: 'src', src: ['blog/**'], dest: 'dist/'}
                ]
            }
        },
        targethtml: {
            dist: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'conf/karma.conf.js',
                singleRun: true
            }
        },
        less: {
            dist: {
                options: {
                    paths: ["assets/css"],
                    yuicompress: true
                },
                files: {
                    "dist/css/main.css": "src/less/custom.less"
                }
            }
        },
        ngtemplates: {
            ngBlog: {
                cwd:      'src',
                src:      ['views/**.html', 'tpl/**.html'],
                dest:     'build/js/app.templates.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('dist', ['ngtemplates', 'karma', 'less', 'concat', 'targethtml', 'copy']);
};
