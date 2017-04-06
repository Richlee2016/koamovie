var router = require('koa-router')();
// var Movie = require('../mongoose/models/movies');

import { markReg } from '../../assets/utils'
//详情页
router.get('/detail/:id', async function(ctx, next) {
    let getId = markReg(ctx.params.id);
    let movie = {};
    try {
        movie = await Movie.findById(getId);
    } catch (err) {
        console.log(err);
    }
    await ctx.render('admin/enter', { movie: movie });
})

module.exports = router;