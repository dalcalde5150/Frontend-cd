const Router = require('koa-router');

const router = new Router();

router.use('/job', require('./routes/job').routes());
router.use('/heartbeat', require('./routes/heartbeat').routes());


module.exports = router;