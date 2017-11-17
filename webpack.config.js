const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: {
        background: './src/background/index.js',
        content: './src/content/index.js',
        options: './src/options/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }/*, {
           test: /\.scss$/,
           loader: ['style-loader', 'css-loader', 'sass-loader']
        }*/]
    },
    plugins: [
        new CopyWebpackPlugin([
            // Copy glob results to /absolute/path/
            {
                context: 'public',
                from: '**/*png',
                to: 'img',
                flatten: true
            },
            {
                context: 'public',
                from: '**/*css',
                to: '.',
                flatten: true
            },
            {
                context: 'src',
                from: 'manifest.json',
                to: '.',
                flatten: true,
                transform: function (content, absolutePath, relativePath) {
                    var data = JSON.parse(content.toString());
                    // store paths in json object or do some other logic
                    data.version = require('./package.json').version;
                    data.icons['128'] = 'img/cdot_128px.png';
                    data.icons['48'] = 'img/cdot_48px.png';
                    data.icons['16'] = 'img/cdot_16px.png';
                    // data.page_action.default_icon['19'] = 'img/cdot_19px.png';
                    // data.page_action.default_icon['38'] = 'img/cdot_38px.png';
                    data.relativePath = relativePath;
                    return new Buffer(JSON.stringify(data));
                }
            },
            {
                context: 'src/options',
                from: 'options*',
                to: '.',
                flatten: true
            },
            {
                context: 'src/jquery',
                from: '*',
                to: '.',
                flatten: true
            },
            {
                from: 'node_modules/jquery/dist/jquery.js',
                to: '.',
                flatten: true
            },
            {
                from: 'bower_components/tooltipster/js/jquery.tooltipster.js',
                to: '.',
                flatten: true
            }
        ])
    ]
}


module.exports = config;
