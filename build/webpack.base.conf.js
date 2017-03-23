var path = require('path')
var config = require('../config')
    // var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

// var env = process.env.NODE_ENV
// var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
// var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
// var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
console.log(config.build.assetsRoot, config.build.assetsPublicPath);
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
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
            },
            // {
            //     test: /\.json$/,
            //     loader: 'json'
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            // }
        ]
    }
}