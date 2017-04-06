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
    let msg;
    try {
        let isUser = await Users.findOne({ username: res.username });
        if (isUser) {
            await isUser.comparePassword(res.password)
                .then(res => {
                    if (res) {
                        ctx.cookies.set('user', 'rich', 0);
                        ctx.body = { msg: "welcome rich's home" }
                    } else {
                        ctx.body = { msg: 'sorry your password is worng' }
                    };
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            ctx.body = { msg: 'the user is not exist' }
        };
    } catch (error) {
        console.log(error);
    }
});

router.get('/list', async function(ctx, next) {
    let allUser = await Users.find({});
    ctx.body = allUser;
});

module.exports = router;