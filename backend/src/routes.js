const Router = require('koa-router');
const events = require('./routes/events');
const users = require('./routes/users');

const router = new Router();
router.use('/events', events.routes());
router.use('/users', users.routes());

module.exports = router;