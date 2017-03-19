var router = require('koa-router')();
var User = require('../mongoose/models/user')
router.get('/',async function (ctx, next) {
  var UserEntity = new User({
    userName:'111',
    passWord:'123'
  })
  await UserEntity.save(function(err){
          if(err){
            console.log("注册出错");
            return;
          };
        });
  await ctx.render('user', { title: 'ok' });      
});

router.get('/get',async function (ctx, next) {
  let allUser = await User.fetch();
  await ctx.render('user', {title: '321'});       
});
module.exports = router;
