const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = 3000;
const workersQueue = require('./queue');

app.use(koaBody());
app.use(require('./routes').routes());

app.listen(port, () => console.log(`Server started on port ${port}`));