const Koa = require('koa');
const app = new Koa();
// const router = require('koa-router')();
const router = require('./routes/main');
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const session = require('koa-session');
const fs = require('fs');
// const logger = require('koa-logger');
//代理
const koaproxy = require('koa-proxy')
    //webpacky
const webpackConfig = require('./build/webpack.base.conf');
const webpack = require('webpack')
const compiler = webpack(webpackConfig)
    //router

// middlewares
app.use(convert(bodyparser));
app.use(convert(session(app)));
app.use(convert(json()));
// app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

//代理
// const douban = new Koa();
// douban.use(koaproxy({
//     host: 'https://api.douban.com/'
// }));


app.use(views(__dirname + '/views', {
    map: { html: 'ejs' }
}));

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});



app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx) {
    console.log(err)
        // logger.error('server error', err, ctx);
});

module.exports = app;