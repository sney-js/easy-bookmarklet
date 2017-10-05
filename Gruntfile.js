module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var path_book = "bookmarklet/";
    var path_book_temp = path_book + "temp/";
    var path_web_js = "/";

    grunt.initConfig({

        path_book: path_book,
        path_book_temp: path_book_temp,
        path_web_js: path_web_js,
        watch: {
            bookmarklet: {
                files: [path_book + '*'],
                tasks: ['bookmarklet']
            }
        },
        clean: {
            bookmarklet: [path_book_temp + "*"]
        },
        cssmin: {
            target: {
                files: {
                    '<%= path_book_temp %>min_style.css': ['<%= path_book %>style.css']
                }
            }
        },
        htmlmin: { // Task
            target: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= path_book_temp %>min_bookmarklet.html': ['<%= path_book %>bookmarklet.html']
                }
            }
        },
        filesToJavascript: {
            default_options: {
                options: {
                    inputFilesFolder: path_book_temp + '',
                    inputFilePrefix: 'min_',
                    useIndexes: false,
                    outputBaseFile: path_book_temp + 'variables',
                    outputBaseFileVariable: 'OutVar',
                    outputFile: path_book_temp + 'var_temp.js'
                }
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            dist: {
                src: [
                    path_book_temp + 'var_temp.js',
                    path_book + 'bookmarklet_action.js',
                    path_book + 'bookmarklet_view.js'
                ],
                dest: path_book_temp + 'bookmarklet_full.js',
            },
            dist_web: {
                src: [
                    path_web_js + 'bookmarklet.js',
                    path_web_js + 'src/tester_src.js'
                ],
                dest: path_web_js + 'tester.js',
            }
        },
        bookmarklet_wrapper: {
            default_options: {
                files: {
                    '<%= path_book_temp %>href_bookmarklet.js': [
                        '<%= path_book_temp %>bookmarklet_full.js'
                    ]
                }
            }
        },
        file_append: {
            default_options: {
                files: [{
                    append: "\";\n",
                    prepend: "var href={};\nhref.bookmarklet_href=\"",
                    input: path_book_temp + 'href_bookmarklet.js',
                    output: path_book_temp + 'tester.js'
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'bookmarklet/'
                }
            }
        }
    });

    grunt.registerTask('emptyFile', 'Creates an empty file', function() {
        grunt.file.write(path_book_temp + 'variables', 'var OutVar={};');
    });

    grunt.registerTask('default', ['bookmarklet', 'connect', 'watch:bookmarklet']);
    grunt.registerTask('bookmarklet', ['clean:bookmarklet', 'emptyFile', 'cssmin', 'htmlmin',
        'filesToJavascript', 'concat:dist', 'bookmarklet_wrapper', 'file_append',
    ]);


};
