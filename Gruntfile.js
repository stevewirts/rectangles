'use strict';

var files = {
    js: [
        'gruntfile.js',
        'geometry.js',
        'test/**/*.js'
    ],

    jshint: [
        'gruntfile.js',
        'geometry.js',
        'test/**/*.js',
    ],

};

module.exports = function(grunt) {

    //load all npm tasks automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {
            js: {
                files: files.js,
                tasks: ['jsbeautifier', 'jshint', 'mochaTest'],
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: []
            }
        },

        jshint: {
            files: files.jshint,
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },

        jsbeautifier: {
            files: files.js,
            options: {
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },

        //----------------------------------
    });

    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('default', [
        'jsbeautifier',
        'jshint',
        'mochaTest',
    ]);

    grunt.registerTask('serve', function() {
        return grunt.task.run([
            'watch'
        ]);
    });
};
