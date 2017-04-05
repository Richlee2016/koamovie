var router = require('koa-router')();
var Users = require('../../mongoose/models/user');
//注册
router.post('/signup', async function(ctx, next) {
    let res = ctx.request.body;
    let user = new Users({
        username: res.username,
        password: res.password
    });
    try {
        let isExist = await Users.findOne({ username: res.username });
        if (isExist) {
            ctx.body = { msg: "The username is exist!" };
        } else {
            await user.save();
            ctx.body = { msg: 'OK' }
        };
    } catch (error) {
        console.log(error);
    }
});

//登录
router.post('/signin', async function(ctx, next) {
    let res = ctx.request.body;
    try {
        let isUser = await Users.findOne({ username: res.username });

        isUser.comparePassword()
            .then(isMatch => {
                console.log(isMatch);
            })

        if (isUser.password !== res.password) {
            ctx.body = { msg: 'sorry your password is worng' }
        } else {
            ctx.body = { msg: "welcome rich's home" }
        };
    } catch (error) {
        console.log(error);
    }
});

router.get('/list', async function(ctx, next) {

    ctx.body = 'test';
});

module.exports = router;