var router = require('koa-router')();
var User = require('../mongoose/models/user')
var koaRequest = require('request-promise')
var prefix ='https://api.douban.com/'
var proxy = {
    movie:prefix+ 'v2/movie/subject/'
}
router.get('/',async function (ctx, next) {
  // var UserEntity = new User({
  //   userName:'111',
  //   passWord:'123'
  // })
  // await UserEntity.save(function(err){
  //         if(err){
  //           console.log("注册出错");
  //           return;
  //         };
  //       });
  await ctx.render('user', { title: 'ok' });      
});

router.get('/get/:id',async function (ctx, next) {
  var allUser = await User.fetch();
  var options = {
      url:proxy.movie + ctx.params.id,
      json:true
  };
  
  const data = await koaRequest(options)
                     .then(function (res) {
                         return res;
                     })
                     .catch(function (err) {
                         console.log(err);
                     });                   
  await ctx.render('user', {title:data});       
});
module.exports = router;
