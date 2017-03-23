var router = require('koa-router')()
var koaRequest = require('koa-request')
var prefix = 'https://api.douban.com/'
var proxy = {
    movie: prefix + 'v2/movie/subject/'
}
router.get('/', async function(ctx, next) {
    ctx.state = {
        title: 'koa2 title'
    };
    console.log(ctx.path);
    const result = await koaRequest(proxy.movie);
    await ctx.render('index', { title: 321 });
})
module.exports = router;