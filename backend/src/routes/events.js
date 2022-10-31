const Router = require('koa-router');
const router = new Router();

router.get('get-events', '/:id', async (ctx) => {
    try {
        const events_list = await ctx.orm.Event.findAll({
            include: {model: ctx.orm.Job, where: {id_user: ctx.params.id}}
        });
        ctx.body = events_list;
        ctx.status = 200;
    } catch (err) {
        ctx.throw(422);
    }
});

module.exports = router;