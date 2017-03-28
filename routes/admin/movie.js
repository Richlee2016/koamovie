var router = require('koa-router')();
var Movie = require('../../mongoose/models/movies');
var assign = require('lodash.assign')

//列表
router.get('/list', async function(ctx, next) {
    let idArr = [];
    try {
        var movies = await Movie.find({}).sort('meta.updateAt');
    } catch (error) {
        console.log(error);
    }
    await ctx.render('admin/movie/list', { movies: movies });
})

//录入
router.get('/enter', async function(ctx, next) {
    let movie = {};
    await ctx.render('admin/movie/enter', { movie: movie });
})

//更新
router.get('/enter/:id', async function(ctx, next) {
    let movie = {};
    const id = ctx.params.id;
    try {
        movie = await Movie.findById(id)
    } catch (error) {
        console.log(error);
    }
    await ctx.render('admin/movie/enter', { movie: movie });
})

//新增|更新
router.post('/enter/new', async function(ctx, next) {
    let newmovie;
    let res = ctx.request.body;
    let getmovie = {
        doctor: res.doctor,
        title: res.title,
        language: res.language,
        country: res.country,
        summary: res.summary,
        flash: res.flash,
        poster: res.poster,
        year: res.year,
    }

    //更新
    if (res.id !== undefined) {
        let movie = {};
        try {
            movie = await Movie.findById(res.id);
            newmovie = assign(movie, getmovie);
            await newmovie.save();
        } catch (err) {
            console.log(err);
        };

    } else {
        // 保存
        let movie = new Movie(getmovie);
        try {
            await movie.save();
        } catch (err) {
            console.log(err);
        }
        console.log('save')
    };
    ctx.redirect('/admin/movie/list');
});

//删除
router.del('/list/delete/:id', async function(ctx, next) {
    try {
        await Movie.remove({ _id: ctx.params.id });
    } catch (error) {
        console.log(error);
    }
    ctx.body = { msg: 'OK' }
})
module.exports = router;