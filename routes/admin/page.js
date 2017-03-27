const router = require('koa-router');

router.use('/list', async function(ctx, next){
    await ctx.render('admin/list');
})

module.exports = router;