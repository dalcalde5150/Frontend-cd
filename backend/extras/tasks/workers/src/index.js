const Bull = require('bull');
const sgMail = require('@sendgrid/mail');
const database = require('./database.js');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const workersQueue = new Bull('workers', { redis: {port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD}});

workersQueue.process((job, done) => {
    console.log('-------------------------------')
    console.log(`Job ${job.id} started`);
    calculo_indice(job, done).then(() => {
        console.log(`Job ${job.id} finished`);
        console.log('-------------------------------')
    }).catch((error) => {
        console.log(error);
        console.log(`Job ${job.id} failed`);
        console.log('-------------------------------')
    });
});

const calculo_indice = async (job, done) => {
    console.log('Calculando indice...');
    try {
        const lat = job.data.latitud;
        const lon = job.data.longitud;
        const eventos = await database.Event.findAll({
            order: [['id', 'DESC']],
            limit: 2000
        });
        let dist_lvl = Object.entries(eventos).map(evento => { 
            let dist = getDist(lat, lon, evento[1]['lat'], evento[1]['lon']);
            if (dist <= 3) {
                return parseFloat((dist*evento[1]['level']).toFixed(3));
            } else {
                return 0;
            }
        });
        let suma = dist_lvl.reduce((x, y) => x + y, 0);
        let result = parseFloat((suma/100).toFixed(3));
        sendEmail(job, result);
        saveResult(job, result);
        done(null, result);
    } catch (error) {
        done(error);
    }
};

// extraido de https://appdividend.com/2022/03/03/send-email-in-node-js/#:~:text=js-,To%20send%20an%20email%20in%20Node.,sending%20email%20messages%20between%20servers.
const sendEmail = async (job, result) => {
    const Job = await database.Job.findByPk(job.data.job_id);
    const emailReceiver = await database.User.findByPk(Job.id_user);


    let msg = {
        from: 'jonanortizvega@uc.cl',
        to: emailReceiver.email,
        subject: 'Resultado cálculo índice',
        text: `Solicitud de cálculo de índice completada. El resultado del índice solicitado es ${result}`,
    }

    sgMail.send(msg);
}


const saveResult = async (job, result) => {
    const Job = await database.Job.findByPk(job.data.job_id);
    Job.resultado = result;
    Job.save();
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
    return d.toFixed(3);
};

console.log("Worker Listening to Tasks...");
