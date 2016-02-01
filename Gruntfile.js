module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-crx');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-jpm');


    var out_dir = 'target';

    var packageInfo = grunt.file.readJSON('package.json');

    var replaceContentMap = {
        BUILD_CAHOOTS_VERSION: packageInfo.version,
        ICON_14:    'cdot_14px.png',
        ICON_14_GREY: 'cdot_14px_grau.png',
        ICON_16: 'cdot_16px.png',
        ICON_16_GREY: 'cdot_16px_grau.png',
        ICON_19: 'cdot_19px.png',
        ICON_19_GREY: 'cdot_19px_grau.png',
        ICON_38: 'cdot_38px.png',
        ICON_38_GREY: 'cdot_38px_grau.png',
        ICON_48: 'cdot_48px.png',
        ICON_48_GREY: 'cdot_48px_grau.png',
        ICON_64: 'cdot_64px.png',
        ICON_64_GREY: 'cdot_64px_grau.png',
        ICON_128: 'cdot_128px.png',
        ICON_128_GREY: 'cdot_128px_grau.png'
    };

    var processingFunction = function (content, srcpath) {
        var resultContent = content;
        for(var cm in replaceContentMap) {
            var re = new RegExp('\\$\{'+cm+'\}','g')
            resultContent = resultContent.replace(re, replaceContentMap[cm]);
        }
        return resultContent;
    };

    var userConfig = {
        pkg: packageInfo,

        src: 'src/main/js',
        src_ff: 'src/main/plugin/firefox',
        src_chrome: 'src/main/plugin/chrome',
        lib_dir: 'cahoots-deps/libs',

        build_dir_firefox: out_dir + '/exploded-firefox',
        build_dir_chrome: out_dir + '/exploded-chrome',
        export_dir: out_dir + '/packaged-out',

        private_key: "development-test.key"
    };

    var taskConfig = {
        clean: [
            out_dir
        ],
        copy: {
            firefox_text: {
                options: {
                    process: processingFunction
                },
                files: [
                    // firefox addon business assets: stylesheets
                    {
                        expand: true,
                        cwd: 'src/main/resources/css',
                        src: '*.css',
                        dest: '<%= build_dir_firefox %>/data'},
                    {
                        expand: true,
                        cwd: 'src/main/resources/html',
                        src: '*.html',
                        dest: '<%= build_dir_firefox %>/data'},
                    // firefox libs
                    {expand: true,
                        cwd: 'bower_components/tooltipster/js/',
                        src: 'jquery.tooltipster.js',
                        dest: '<%= build_dir_firefox %>/data'},
                    {expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: ['jquery.js'],
                        dest: '<%= build_dir_firefox %>/data'},
                    // firefox jquery highlight
                    {expand: true,
                        cwd: 'src/main/js/jquery',
                        src: '*.js',
                        dest: '<%= build_dir_firefox %>/data'},
                    {
                        expand: true,
                        cwd: 'src/main/js/firefox',
                        src: '**/*',
                        dest: '<%= build_dir_firefox %>'
                    }, {expand: true,
                        cwd: 'target/js',
                        src: 'CahootsContentBundle.js',
                        dest: '<%= build_dir_firefox %>/data'},
                    {expand: true,
                        cwd: 'target/js',
                        src: 'FirefoxContentScriptBundle.js',
                        dest: '<%= build_dir_firefox %>/data'},
                    {expand: true,
                        cwd: 'target/js',
                        src: 'CahootsExtensionBundle.js',
                        dest: '<%= build_dir_firefox %>/lib'},
                    {expand: true,
                        cwd: 'target/js',
                        src: 'FirefoxExtensionBundle.js',
                        dest: '<%= build_dir_firefox %>/lib'}

                ]
            },
            firefox_bin: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/resources/images/icon',
                        src: ['cdot_*.png'],
                        dest: '<%= build_dir_firefox %>/data'
                    }

                ]
            },
            chrome_text: {
                options: {
                    process: processingFunction
                },
                files: [
                    // chrome plugin skeleton
                    {expand: true,
                        cwd: 'src/main/js/chrome',
                        src: ['ChromeContentScriptLoader.js', 'ChromeExtensionLoader.js', 'manifest.json'],
                        dest: '<%= build_dir_chrome %>'},
                    //
                    {expand: true,
                        cwd: 'bower_components/tooltipster/js/',
                        src: 'jquery.tooltipster.js',
                        dest: '<%= build_dir_chrome %>'},
                    {expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: 'jquery.js',
                        dest: '<%= build_dir_chrome %>'},
                    // chrome addon business assets: stylesheets
                    {
                        expand: true,
                        cwd: 'src/main/resources/css',
                        src: ['*.css'],
                        dest: '<%= build_dir_chrome %>'},
                    {
                        expand: true,
                        cwd: 'src/main/resources/html',
                        src: ['*.html'],
                        dest: '<%= build_dir_chrome %>'},
                    // chrome libs
//                    {expand: true,
//                        cwd: 'cahoots-deps/libs',
//                        src: ['*.min.js'],
//                        dest: '<%= build_dir_chrome %>'},
                    // chrome jquery highlight
                    {expand: true,
                        cwd: 'src/main/js/jquery',
                        src: 'jquery_highlight.js',
                        dest: '<%= build_dir_chrome %>'},
                    {expand: true,
                        cwd: 'target/js',
                        src: ['Cahoots*.js','Chrome*.js'],
                        dest: '<%= build_dir_chrome %>/'}
                ]
            },
            chrome_bin: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/resources/images/icon',
                        src: ['cdot_*.png', 'verified.png'],
                        dest: '<%= build_dir_chrome %>/img'
                    }
                ]
            }
        },

        mkdir: {
            target_dir: {
                options: {
                    create: [userConfig.build_dir_firefox, userConfig.build_dir_chrome]
                },
            },
        },

        jpm: {
            options: {
                src: "<%= build_dir_firefox %>",
                //xpi: "<%= export_dir %>"
            }
        },

        /**
         * see https://github.com/oncletom/grunt-crx
         */
        /*
        */
        crxPkg: grunt.file.readJSON('package.json'),
        crx: {
            cahootsExtension: {
                "src": ["<%= build_dir_chrome %>/**/*"],
                "dest": "<%= export_dir %>",
                "zipDest": "<%= export_dir %>",

                "options": {
                    "privateKey": userConfig.private_key
                }
            }
        },

        karma: {
            app: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS', 'Firefox'],
                logLevel: 'ERROR'
            },
            chrome_ui_tests: {
                configFile: 'karma-chrome.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['Chrome'],
                logLevel: 'ERROR'
            },
            firefox_ui_tests: {
                configFile: 'karma-firefox.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['Chrome'],
                logLevel: 'ERROR'
            }
        },

        browserify: {
            content_bundle: {
                src: 'src/main/js/app/content/*.js',
                dest: out_dir + "/js/" + 'CahootsContentBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: "cahoots.content"
                    }
                }
            },

            extension_bundle: {
                src: 'src/main/js/app/extension/index.js',
                dest: out_dir + "/js/" + 'CahootsExtensionBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: "cahoots.extension"
                    }
                }
            },

            chrome_content_script: {
                src: 'src/main/js/chrome/ChromeContentScript.js',
                dest: out_dir + "/js/" + 'ChromeContentScriptBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: "cahoots.chrome.content"
                    }
                }
            },

            firefox_content_script: {
                src: 'src/main/js/firefox/data/FirefoxContentScript.js',
                dest: out_dir + "/js/" + 'FirefoxContentScriptBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: "cahoots.firefox.content"
                    }
                }
            },

            chrome_extension_application: {
                src: [/*'src/main/js/app/extension/index.js', */'src/main/js/chrome/ChromeExtension.js'],
                dest: out_dir + "/js/" + 'ChromeExtensionBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: 'cahoots.chrome.extension'
                    }
                }
            },

            firefox_extension_application: {
                src: [
                    /*'src/main/js/app/extension/index.js', */
                    'src/main/js/firefox/lib/lol.js',
                    'src/main/js/firefox/lib/FirefoxExtensionScript.js'
                ],
                dest: out_dir + "/js/" + 'FirefoxExtensionBundle.js',
                options: {
                    browserifyOptions: {
                        debug: false,
                        standalone: 'cahoots.firefox.extension'

                    },
                    external: [
                        'chrome',
                        'sdk/timers',
                        'sdk/self',
                        'sdk/page-mod',
                        'sdk/simple-storage',
                        'sdk/tabs',
                        'sdk/window/utils'
                    ]
                }
            }
        },

        watch: {
            files: ['src/**/*'],
            tasks: ['tests']
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * The default task is to build both extensions
     */
    grunt.registerTask('default', [ 'build_all' ]);

    grunt.registerTask('build_all', [ 'clean', 'mkdir:target_dir', 'karma:app', 'build_firefox', 'build_chrome' ]);
    grunt.registerTask('tests', ['build_all', 'karma:chrome_ui_tests', 'karma:firefox_ui_tests']);

    grunt.registerTask('browserify_app', [ 'browserify:content_bundle', 'browserify:extension_bundle' ]);

    grunt.registerTask('browserify_chrome',
        [ 'browserify:chrome_content_script', 'browserify:chrome_extension_application']
    );
    grunt.registerTask('browserify_firefox',
        [ 'browserify_app', 'browserify:firefox_content_script', 'browserify:firefox_extension_application'
    ]);

    //grunt.registerTask('build_firefox', "builds the cahoots firefox addon (stable sdk version)", [ 'browserify_app','browserify_firefox','copy:firefox','mozilla-cfx-xpi:stable' ]);
    grunt.registerTask('build_firefox', "builds the cahoots firefox addon (jpm)", [
        'browserify_app',
        'browserify_firefox',
        'copy:firefox_bin',
        'copy:firefox_text',
        //'jpm',
        //'mkdir:target_dir',
        'jpm:xpi'
    ]);

    //grunt.registerTask('build_firefox_experimental', "builds the cahoots firefox addon (unstable sdk version)", [ 'browserify_app','copy:firefox','mozilla-cfx-xpi:experimental' ]);

    grunt.registerTask('build_chrome', "builds the cahoots chrome extension",[
        'browserify_app',
        'browserify_chrome',
        'copy:chrome_bin',
        'copy:chrome_text',
        'crx'
    ]);

    grunt.registerTask('run_firefox', "runs the cahoots firefox addon (stable sdk version)",[ 'clean','karma:app','build_firefox','mozilla-cfx:run_stable' ]);
    grunt.registerTask('run_firefox_experimental', "runs the cahoots firefox addon (unstable sdk version)",[ 'clean','karma','build_firefox_experimental','mozilla-cfx:run_experimental' ]);


};
