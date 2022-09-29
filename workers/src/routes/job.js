const Router = require('koa-router');

const router = new Router();

router.post('/', async (ctx) => { 
    ctx.body = await ctx.request.body;
});

router.get('/:id', async (ctx) => {
    ctx.body = ctx.params.id;
});

module.exports = router;