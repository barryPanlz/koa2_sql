const router = require('koa-router')()
router.prefix('/api');


router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'api'
    })
})


const {
    findData,
    addData,
    deleData,
    exitData
} = require('../../config/db');//引入封装的db库..


router.get('/selectID', async (ctx) => { // 获取数据
    console.log(this)
    let res = ctx.query;
    // 返回的数据格式为json
    ctx.response.type = 'json';
    let sql = `SELECT * FROM user_list WHERE id=${res.ID}` //根据ID获取数据
    await findData(sql).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据获取失败' };
    });
})
// 添加一条数据
router.post("/doAdd", async (ctx) => {
    console.log(ctx.request.body.parameter);
    let res = ctx.request.body;
    let parameter = res.parameter;
    console.log(parameter)
    ctx.response.type = 'json';
    var dateee = new Date(parameter.cream_date).toJSON();
    var cream_date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    let Dodata = [`${parameter.name}`, `${parameter.address}`, cream_date]
    let sql = `INSERT INTO user_list(name,address,cream_date) VALUES(?,?,?)` //添加到user——list里面数据
    await addData(sql, Dodata).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据添加失败' };
    });
})
// 获取数据
router.get('/list', async (ctx) => { // 获取数据
    let res = ctx.query;
    // 返回的数据格式为json
    ctx.response.type = 'json';
    let sql = `SELECT * FROM user_list` //获取user_list 数据
    await findData(sql).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据获取失败' };
    });
});
// 修改数据
router.post('/exit', async (ctx) => {
    let res = ctx.request.body;
    console.log(res.editdata)
    var dateee = new Date(res.editdata.cream_date).toJSON();
    var cream_date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    let sql = `UPDATE user_list SET name='${res.editdata.name}',address='${res.editdata.address}',cream_date='${cream_date}' WHERE ID=${res.ID}`;
    let editData = [`${res.editdata.name}`, `${res.editdata.address}`, cream_date]
    ctx.response.type = 'json';
    await exitData(sql).then(data => {
        ctx.body = data;

    }, () => {
        ctx.body = { err: '数据修改失败' };
    });
});
// 删除数据
router.get('/delete', async (ctx) => {
    let res = ctx.query;
    ctx.response.type = 'json';
    let sql = `DELETE FROM user_list WHERE ID=${res.ID}`
    await deleData(sql).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据删除失败' };
    });
});
module.exports = router;
