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
        path: __dirname + '/target/new'
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
            {   context: 'src/main/resources',
                from: '**/*png',
                to: 'img',
            flatten: true},
            {   context: 'src/main/resources',
                from: '**/*css',
                to: '.',
                flatten: true},
            {   context: 'src',
                from: 'manifest.json',
                to: '.',
                flatten: true,
                transform: function (content, absolutePath, relativePath) {
                    var data = JSON.parse(content.toString());
                    // store paths in json object or do some other logic
                    data.version = require('./package.json').version;
                    data.relativePath = relativePath;
                    return new Buffer(JSON.stringify(data));
                }}
        ])
    ]
}



module.exports = config;
