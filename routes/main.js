const router = require('koa-router')();

//home
const index = require('./index/index');
const movie = require('./index/movie');
//admin
const adminMovie = require('./admin/movie');
const adminUsers = require('./admin/users');
//前台页面
router.use('/', index.routes(), index.allowedMethods());
router.use('/movie', movie.routes(), movie.allowedMethods());
//后台页面
router.use('/admin/movie', adminMovie.routes(), adminMovie.allowedMethods());
router.use('/api/users', adminUsers.routes(), adminUsers.allowedMethods());

module.exports = router;