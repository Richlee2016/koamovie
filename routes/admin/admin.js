var router = require('koa-router')();
var Movie = require('../../mongoose/models/movies');
var assign = require('lodash.assign')
router.get('/enter', async function(ctx, next) {
    ctx.state = {
        title: 'koa2 title'
    };
    await ctx.render('admin/enter', { title: 321 });
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
    var id = res._id;
    console.log(res._id);
    if (id !== undefined) {
        console.log(0);
        await Movie.findById(id)
            .then((res) => {
                newmovie = assign(res, getmovie);
                newmovie.save(function(err) {
                    if (err) {
                        console.log(err);
                    };
                });
            }).catch((err) => {
                console.log(err);
            });
        return;
    };
    //保存
    var movie = new Movie(getmovie)
    movie.save(function(err) {
        if (err) {
            console.log(err);
        };
        ctx.redirect('/admin/list');
    });
    await ctx.render('admin/entery', { title: 321 });
})

router.get('/list', async function(ctx, next) {
    var movies = await Movie.fetch().exec().then(res => {
        return res;
    }).catch(err => {
        console.log(err);
    })

    await ctx.render('admin/admin', { movies: movies });
})



module.exports = router;