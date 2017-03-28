var router = require('koa-router')()
var koaRequest = require('koa-request')
var prefix = 'https://api.douban.com/'
var proxy = {
    movie: prefix + 'v2/movie/subject/'
}
router.get('/:id', async function(ctx, next) {
    console.log(ctx.params);
    await ctx.render('index', { title: '321' });
})
module.exports = router;