// Karma configuration
// Generated on Sun Feb 22 2015 20:56:28 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //frameworks: ['jasmine-jquery', 'jasmine'],
        frameworks: ['jasmine-jquery','jasmine','commonjs'],

        plugins: [
            'karma-commonjs',
            'karma-jasmine',
            'karma-jasmine-jquery',

            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-nyan-reporter'
        ],

        // list of files / patterns to load in the browser
        files: [

            {pattern: 'src/main/resources/css/*.css'},


            {pattern: 'src/test/js/main-test.js', included: true},
            {pattern: 'src/test/js/mock/**/*.js', included: true},

            {pattern: 'src/main/js/jquery/*js', included: true},
            {pattern: 'bower_components/tooltipster/js/jquery.tooltipster.js', included: true},

            {pattern: 'target/js/*.js', included: true},

            
            {pattern: 'src/main/js/chrome/*.js', served: true, included: false},

            {pattern: 'src/test/js/chrome/*.js', included: true},

            //{pattern: 'src/main/js/chrome/**/*js', included: true},
            //{pattern: 'node_modules/karma-jasmine-jquery/node_modules/bower-installer/node_modules/node-fs/lib/fs.js', included: true, served: true},
            //{pattern: 'node_modules/node-fs/lib/fs.js', included: true, served: true},
            {pattern: 'src/test/resources/html/*.html', watched: true, served: true, included: true},

        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        //preprocessors: {},

        preprocessors: {
            'src/**/*.js': ['commonjs']
        },

        commonjsPreprocessor: {
            modulesRoot: 'src/main/js'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress'],
        reporters: ['nyan'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'Chrome']//, ''],
        //browsers: ['Firefox','Chrome'],
        //browsers: ['PhantomJS'],

        ,browserNoActivityTimeout: 8000

        , captureTimeout: 60000

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        //singleRun: true
    });
};
