const Router = require('koa-router');
const router = new Router();
const axios = require('axios');

router.post('new_job', '/new', async (ctx) => {
    const res = await axios.post('http://localhost:8080/job', ctx.request.body);
    console.log(res.data);
    ctx.body = 'new job';
    ctx.status = 200;
});

router.get('get_job', '/:id', async (ctx) => {

});

module.exports = router;