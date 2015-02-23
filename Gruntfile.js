module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mozilla-addon-sdk');
    grunt.loadNpmTasks('grunt-crx');

    var out_dir = 'dest';
    var mozillaConfig = {
        stable_sdk_version: '1.17'
    }

    var userConfig = {
        pkg: grunt.file.readJSON('package.json'),

        src_ff: 'src/main/plugin/firefox',
        src_chrome: 'src/main/plugin/chrome',
        lib_dir: 'cahoots-deps/libs',

        build_dir_firefox: out_dir+'/exploded-out/firefox',
        build_dir_chrome: out_dir+'/exploded-out/chrome',
        export_dir: out_dir+'/packaged-out',

        private_key: "development-test.key"
    };
    var taskConfig = {
        clean: [
            out_dir
        ],
        copy: {
            firefox: {
                files: [
                    // firefox plugin skeleton
                    {expand: true,
                        cwd: 'src/main/plugin/firefox/',
                        src: '**',
                        dest: '<%= build_dir_firefox %>'},
                    // firefox cahoots data
                    {
                        expand: true,
                        cwd: 'cahoots-deps/db',
                        src: ['db.json'],
                        dest: '<%= build_dir_firefox %>/data'},
                    // firefox addon assets: icons
                    {
                        expand: true,
                        cwd: 'cahoots-deps/assets',
                        src: ['icon.png','icon64.png'],
                        dest: '<%= build_dir_firefox %>'},
                    // firefox addon business assets: stylesheets
                    {
                        expand: true,
                        cwd: 'cahoots-deps/assets',
                        src: ['*.css'],
                        dest: '<%= build_dir_firefox %>/data'},
                    // firefox libs
                    {expand: true,
                        cwd: 'bower_components/tooltipster/js/',
                        src: ['jquery.tooltipster.js'],
                        dest: '<%= build_dir_firefox %>/data'},
                    {expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: ['jquery.js'],
                        dest: '<%= build_dir_firefox %>/data'},
                    // firefox jquery highlight
                    {expand: true,
                        cwd: 'src/main/js',
                        src: '*.js',
                        dest: '<%= build_dir_firefox %>/data'}
                ]
            },
            chrome: {
                files: [
                    // chrome plugin skeleton
                    {expand: true,
                        cwd: '<%= src_chrome %>',
                        src: '**',
                        dest: '<%= build_dir_chrome %>'},
                    // chrome cahoots data
                    {
                        expand: true,
                        cwd: 'cahoots-deps/db',
                        src: ['db.json'],
                        dest: '<%= build_dir_chrome %>'},
                    // chrome addon assets: icons
                    {
                        expand: true,
                        cwd: 'cahoots-deps/assets',
                        src: ['icon14.png','icon16.png','icon19.png','icon48.png','icon128.png','verified.png'],
                        dest: '<%= build_dir_chrome %>/img'},

                    //
                    {expand: true,
                        cwd: 'bower_components/tooltipster/js/',
                        src: ['jquery.tooltipster.js'],
                        dest: '<%= build_dir_chrome %>'},
                    {expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: ['jquery.js'],
                        dest: '<%= build_dir_chrome %>'},
                    // chrome addon business assets: stylesheets
                    {
                        expand: true,
                        cwd: 'cahoots-deps/assets',
                        src: ['*.css'],
                        dest: '<%= build_dir_chrome %>'},
                    // chrome libs
//                    {expand: true,
//                        cwd: 'cahoots-deps/libs',
//                        src: ['*.min.js'],
//                        dest: '<%= build_dir_chrome %>'},
                    // chrome jquery highlight
                    {expand: true,
                        cwd: 'src/main/js',
                        src: '*.js',
                        dest: '<%= build_dir_chrome %>'}
                ]
            }
        },
        "mozilla-addon-sdk": {
            'stable': {
                options: {
                    revision: mozillaConfig.stable_sdk_version
                }
            },
            'master': {
                options: {
                    revision: "master",
                    github: true
                    // github_user: "mozilla" // default value
                }
            }
        },
        /**
         * https://www.npmjs.org/package/grunt-mozilla-addon-sdk
         */
        "mozilla-cfx-xpi": {
            'stable': {
                options: {
                    "mozilla-addon-sdk": "stable",
                    extension_dir: "<%= build_dir_firefox %>",
                    dist_dir: "<%= export_dir %>/firefox-addon-stable"
                }
            },
            'experimental': {
                options: {
                    "mozilla-addon-sdk": "master",
                    extension_dir: "<%= build_dir_firefox %>",
                    dist_dir: "<%= export_dir %>/firedox-addon-experimental"

                }
            }
        },
        "mozilla-cfx": {
            custom_command: {
                options: {
                    "mozilla-addon-sdk": "stable",
                    extension_dir: "<%= build_dir_firefox %>",
                    command: "run"
                    /*,
                    arguments: "-b /usr/bin/firefox-nightly -p /tmp/PROFILE_REUSED"*/
                }
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
                "dest": "<%= export_dir %>/chrome",
                "zipDest": "<%= export_dir %>/chrome",

                "options": {
                    "privateKey": userConfig.private_key
                }
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * The default task is to build both extensions
     */
    grunt.registerTask('default', [ 'build_all' ]);
    grunt.registerTask('build_all', [ 'clean','build_firefox','build_chrome' ]);

    grunt.registerTask('build_firefox', "builds the cahoots firefox addon(need activation of sdk beforehand)", [ 'copy:firefox','mozilla-cfx-xpi' ]);
    grunt.registerTask('build_chrome', "builds the cahoots chrome extension",[ 'copy:chrome','crx' ]);

    grunt.registerTask('run_firefox', "runs the cahoots firefox addon(need activation of sdk beforehand)",[ 'clean','build_firefox','mozilla-cfx' ]);


};
