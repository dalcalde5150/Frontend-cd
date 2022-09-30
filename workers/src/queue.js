const Bull = require('bull');
const calculo_indice = require('./process');

const workersQueue = new Bull('workers', { redis: {port: 6379, host: '127.0.0.1'}});

workersQueue.process(async (job, done) => {
    console.log('-------------------------------')
    console.log(`Job ${job.id} started`);
    await calculo_indice(job, done);
    console.log(`Job ${job.id} finished`);
    console.log('-------------------------------')
});

module.exports = workersQueue;