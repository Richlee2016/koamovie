var router = require('koa-router')();
var Movie = require('../../mongoose/models/movies');
var assign = require('lodash.assign')

import { markReg } from '../../assets/utils'

router.get('/enter', async function(ctx, next) {
    await ctx.render('admin/enter', { title: "add" });
})

router.get('/enter/:id', async function(ctx, next) {
    let getId = markReg(ctx.params.id);
    let movie = {};
    try {
        movie = await Movie.findById(getId);
    } catch (err) {
        console.log(err);
    }
    await ctx.render('admin/enter', { movie: movie });
})


router.post('/enter/new', async function(ctx, next) {
    var newmovie;
    var res = ctx.request.body;
    var getmovie = {
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
    var id = markReg(res._id);
    if (id.length > 0) {
        let movie = {};
        try {
            movie = await Movie.findById(id);
            newmovie = assign(movie, getmovie);
            await newmovie.save();
        } catch (err) {
            console.log(err);
        };
    } else {
        // 保存
        var movie = new Movie(getmovie);
        try {
            await movie.save();
        } catch (err) {
            console.log(err);
        }
    };
    ctx.redirect('/admin/list');
    // await ctx.render('admin/enter', { movie: {} });
})

router.get('/list', async function(ctx, next) {
    let idArr = [];
    try {
        var movies = await Movie.fetch()
    } catch (error) {
        console.log(error);
    }
    await ctx.render('admin/admin', { movies: movies });
})



module.exports = router;