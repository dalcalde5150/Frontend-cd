const Bull = require('bull');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = 8080;
const Router = require('koa-router');

const workersQueue = new Bull('workers', { redis: {port: 6379, host: redis}});

const router = new Router();
const job_router = new Router();
const heartbeat_router = new Router();

job_router.post('/', async (ctx) => { 
    const job = await workersQueue.add(ctx.request.body);
    console.log(`Job ${job.id} added to queue`);
    ctx.body = job.id;
});

job_router.get('/:id', async (ctx) => {
    ctx.body = ctx.params;
});

heartbeat_router.get('/', async (ctx) => {
    ctx.body = true;
});

router.use('/job', job_router.routes());
router.use('/heartbeat', heartbeat_router.routes());

app.use(koaBody());
app.use(router.routes());

app.listen(port, () => console.log(`Server started on port ${port}`));