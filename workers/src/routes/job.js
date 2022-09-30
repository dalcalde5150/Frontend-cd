const Router = require('koa-router');
const workersQueue = require('../queue');

const router = new Router();

router.post('/', async (ctx) => { 
    const job = await workersQueue.add(ctx.request.body);
    ctx.body = job.id;
});

router.get('/:id', async (ctx) => {
    ctx.body = ctx.params.id;
});

module.exports = router;