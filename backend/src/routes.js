const Router = require('koa-router');
const events = require('./routes/events');
const users = require('./routes/users');
const workers = require('./routes/workers');

const router = new Router();
router.use('/events', events.routes());
router.use('/users', users.routes());
router.use('/workers', workers.routes());

module.exports = router;