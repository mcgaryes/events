module.exports = function(grunt) {

    "use strict";

    var NAME = "Events";
    var VERSION = "0.9.0";
    var DESCRIPTION = "Attach, remove and trigger events on any object that inherits this small utility.";
    var REPOSITORY = "https://github.com/mcgaryes/events/";
    var BANNER = "/*!\n* " + NAME + " v" + VERSION + "\n* " + DESCRIPTION + "\n* " + REPOSITORY + "\n*/";

    // config
    grunt.initConfig({
        lint: {
            files: ['grunt.js', '../events.js']
        },
        meta: {
            banner: BANNER
        },
        jasmine: {
            all: {
                src: ['../tests/index.html'],
                errorReporting: true
            }
        },
        min: {
            all: {
                src: ['<banner>', '../events.js'],
                dest: '../events.min.js'
            }
        },
        copy: {
            version: {
                options: {
                    processContent: function() {
                        return VERSION;
                    }
                },
                files: {
                    "../VERSION": "../VERSION"
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true,
                smarttabs: false,
                strict: true
            },
            globals: {
                yui: true
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-jasmine-task');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // tasks
    grunt.registerTask('default', ['lint', 'jasmine', 'min', 'copy:version']);

};