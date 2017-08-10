const webpack = require('webpack');
const path = require('path');

let config = {
    entry: './src/main/js/extension.js',
    output: {
        path: path.resolve(__dirname, './target'),
        filename: 'output.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
           test: /\.scss$/,
           loader: ['style-loader', 'css-loader', 'sass-loader']
        }]
    }
}



module.exports = config;
