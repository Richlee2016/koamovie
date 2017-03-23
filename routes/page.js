var router = require('koa-router')();
var Movie = require('../mongoose/models/movies');
router.get('/detail/:id', async function(ctx, next) {
    console.log(ctx.params.id);
    await ctx.render('admin/enter', { title: 321 });
})

module.exports = router;