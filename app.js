const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
// const logger = require('koa-logger');
//代理
const koaproxy = require('koa-proxy')
    //webpacky
const webpackConfig = require('./build/webpack.base.conf');
const webpack = require('webpack')
const compiler = webpack(webpackConfig)
    //router
const index = require('./routes/index');
// const page = require('./routes/page');
// const users = require('./routes/users');

// const admin = require('./routes/admin/admin');
// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
// app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

//代理
// app.use(koaproxy({
//   host: 'http://dushu.xiaomi.com/'
// }));

app.use(views(__dirname + '/views', {
    map: { html: 'swig' }
}));

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//前台页面
router.use('/', index.routes(), index.allowedMethods());
// router.use('/page', page.routes(), page.allowedMethods());

//后台页面
const adminmovie = require('./routes/admin/movie');
router.use('/admin/movie', adminmovie.routes(), adminmovie.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx) {
    console.log(err)
        // logger.error('server error', err, ctx);
});

module.exports = app;