var router = require('koa-router')();
var user=require("./user.js")
var focus = require("./focus.js")
router.prefix('/admin');


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 3!'
  })
})

router.use("/user", user.routes())
router.use("/focus", focus.routes())
module.exports = router;
