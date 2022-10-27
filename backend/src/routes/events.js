const Router = require('koa-router');
const router = new Router();

router.get('get-events', '/', async (ctx) => {
    try {
        const events_list = await ctx.orm.Event.findAll();
        ctx.body = events_list;
        ctx.status = 200;
    } catch (err) {
        ctx.throw(422);
    }
});

module.exports = router;