var router = require('koa-router')();
var Movie = require('../../mongoose/models/movies');
//page
router.get('/list', async function(ctx, next){
    await ctx.render('admin/list');
})
router.get('/enter', async function(ctx, next){
    await ctx.render('admin/enter');
})

//api
//列表
router.get('/api/v0/list', async function(ctx, next) {
    let idArr = [];
    try {
        var movies = await Movie.find({}).sort('meta.updateAt');
    } catch (error) {
        console.log(error);
    }
    console.log(movies)
    ctx.body = movies;
})

module.exports = router;