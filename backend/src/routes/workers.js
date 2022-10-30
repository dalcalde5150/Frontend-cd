const Router = require('koa-router');
const router = new Router();
const axios = require('axios');

router.post('new_job', '/new', async (ctx) => {
    try {
        const job_count = await ctx.orm.Job.count({
            where: {
                id_user: ctx.request.body.id_user,
                id_event: ctx.request.body.id_event
            }
        });
        if (job_count > 0) {
            const job = await ctx.orm.Job.findOne({
                where: {
                    id_user: ctx.request.body.id_user,
                    id_event: ctx.request.body.id_event
                }
            });
            job.resultado = -1;
            await job.save();
        } else {
            const job = await ctx.orm.Job.create({
                id_user: ctx.request.body["id_user"],
                id_event: ctx.request.body["id_event"],
                resultado: -1
            });
        }
        const job = await ctx.orm.Job.findOne({
            where: {
                id_user: ctx.request.body.id_user,
                id_event: ctx.request.body.id_event
            }
        });
        ctx.request.body.job_id = job.id;
        const res = await axios.post('http://44.208.40.132:8080/job', ctx.request.body);
        console.log(res.data);
        ctx.body = 'new job';
        ctx.status = 200;
    } catch (error) {
        console.log(error);
        ctx.throw(422);
    }
});

router.get('get_job', '/:id', async (ctx) => {

});

router.get('get_heartbeat', '/', async (ctx) => {
    const res = await axios.get('http://44.208.40.132:8080/heartbeat');
    console.log(res.data);
    ctx.body = res.data;
    ctx.status = 200;
});

module.exports = router;