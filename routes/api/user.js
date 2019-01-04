const router = require('koa-router')();
const common = require('../../libs/common.js');
const {
    findData,
    addData,
    deleData,
    exitData
} = require('../../config/db');//引入封装的db库..。

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'api'
    })
})
// 注册
router.post("/regist", async (ctx,next) => {
    // console.log(ctx.request.body);
    let res = ctx.request.body;
    // console.log(res)
    let sql0 = `SELECT * FROM user_login WHERE userName='${res.userName}'` //根据username查看是否有同名
    await findData(sql0).then(data => {
        ctx.body = data;
        // console.log(data);
        next();
        if(data.length==0){
            console.log(res.passWord)
            let password = common.md5(res.passWord + common.MD5_SUFFIX);//md5加密
            console.log(password)
            let Dodata = [`${res.userName}`, `${password}`]
            let sql = `INSERT INTO user_login(userName,passWord) VALUES(?,?)` //添加到user——list里面数据
            addData(sql, Dodata).then(data => {
                ctx.body = data;
            }, () => {
                ctx.body = { err: '数据添加失败' };
            });
        }else{
            ctx.body = { err: '此用户名已被注册' };
        }
    }, () => {
        ctx.body = { err: '数据获取失败' };
    });
})
// 登录
router.post("/login", async (ctx, next) => {
    // console.log(ctx.request.body);
    let res = ctx.request.body;
    console.log(res)
    let sql = `SELECT * FROM user_login WHERE userName='${res.userName}'` //根据username查看是否有同名
    await findData(sql).then(data => {
        if (data.length != 0) {
            let password = common.md5(res.passWord + common.MD5_SUFFIX);
            // console.log(password)
            // console.log(data[0].passWord)
            if (data[0].passWord == password){
                ctx.body = { data: '登陆成功' };
           }else{
                ctx.body = { data: '用户名或密码错误' };
           }
        } else {
            ctx.body = { data: '用户不存在' };
        }
    }, () => {
        ctx.body = { err: '数据获取失败' };
    });
})
module.exports = router
