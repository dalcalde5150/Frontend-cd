const Router = require('koa-router');
const events = require('./routes/events');
const users = require('./routes/users');
const workers = require('./routes/workers');
const auth_middle = require('./middleware/auth');

const router = new Router();
router.use('/events', auth_middle, events.routes());
router.use('/users', users.routes());
router.use('/workers', auth_middle, workers.routes());

module.exports = router;