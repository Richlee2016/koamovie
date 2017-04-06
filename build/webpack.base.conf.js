var path = require('path')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "admin/list": path.resolve(projectRoot, './src/admin/list'),
        "admin/add": path.resolve(projectRoot, './src/admin/add')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/enter.js',
        movie: './src/main.js',
        admin: './src/admin.js'
    },
    output: {
        path: path.resolve(__dirname, '../movie'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, ]
    },
    plugins: [new HtmlWebpackPlugin()]
}