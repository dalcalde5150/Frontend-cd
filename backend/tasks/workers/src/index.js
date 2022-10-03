const Bull = require('bull');
const sgMail = require('@sendgrid/mail')
const database = require('./database.js');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const workersQueue = new Bull('workers', { redis: {port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD}});

workersQueue.process(async (job, done) => {
    console.log('-------------------------------')
    console.log(`Job ${job.id} started`);
    await calculo_indice(job, done);
    console.log(`Job ${job.id} finished`);
    console.log('-------------------------------')
});

const calculo_indice = (job, done) => {
    try {
        const { id, lat, lon, eventos } = job.data;
        let dist_lvl = Object.entries(eventos).map(evento => { 
            let dist = getDist(lat, lon, evento[1]['lat'], evento[1]['lon']);
            if (dist <= 3) {
                return dist*evento[1]['level'];
            } else {
                return 0;
            }
        });
        let suma = dist_lvl.reduce((x, y) => x + y, 0);
        sendEmail(job, suma/100);
        saveResult(job, suma/100);
        done(null, suma/100);
    } catch (error) {
        done(error);
    }
};

// extraido de https://appdividend.com/2022/03/03/send-email-in-node-js/#:~:text=js-,To%20send%20an%20email%20in%20Node.,sending%20email%20messages%20between%20servers.
const sendEmail = async (job, result) => {
    const Job = await database.Job.findByPk(job.id);
    const emailReceiver = await database.User.findByPk(Job.user_id);


    let msg = {
        from: 'jonanortizvega@uc.cl',
        to: emailReceiver.email,
        subject: 'Resultado Calculo Indice',
        text: `El resultado del indice solicitado es ${result}`,
    }

    sgMail.send(msg);
}


const saveResult = async (job, result) => {
    const Job = await database.Job.findByPk(job.id);
    await Job.update({
        resultado: result
    })
}

/* código extraído de 
https://reviblog.net/2016/01/08/javascript-obtener-la-distancia-distancia-en-kilometros-entre-dos-puntos-dadas-por-su-latitud-y-longitud/ */
getDist = (lat1, lon1, lat2, lon2) => {
    rad = (x) => x * Math.PI / 180;
    let R = 6378.137; //Radio de la tierra en km
    let dLat = rad(lat2 - lat1);
    let dLong = rad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d * 1000;
};

console.log("Worker Listening to Tasks...");
