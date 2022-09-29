const Bull = require('bull');
const calculo_indice = require('./process');

const workersQueue = new Bull('workers', { redis: {port: 6379, host: '127.0.0.1'}});

workersQueue.process(async (job, done) => {
    await calculo_indice(job, done);
});

module.exports = workersQueue;