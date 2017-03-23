var path = require('path')
var merge = require('webpack-merge')

var preodEnv = { NODE_ENV: '"production"' }
var devEnv = merge(preodEnv, { NODE_ENV: '"development"' })
var testEnv = merge(devEnv, { NODE_ENV: '"testing"' })
module.exports = {
    build: {
        env: preodEnv,
        index: path.resolve(__dirname, '../views/layout.html'),
        assetsRoot: path.resolve(__dirname, '../movie'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: devEnv,
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
}