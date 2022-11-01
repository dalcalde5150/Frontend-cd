// Variables necesarias para el funcionamiento de la app
require('dotenv').config();
const Koa = require('koa');
const orm = require('./models');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const router = require('./routes');
const session = require('koa-session');
const port = process.env.PORT || 3000;

// Se crea la app como instancia de Koa
const app = new Koa();

// Se asigna el orm a la app
app.context.orm = orm;

// Se asigna el cors a la aplicación
app.use(cors({ credentials: true, origin: 'https://arqsis-26.tk' }));

// Logs de los requests
app.use(koaLogger());

// Parse request body
app.use(koaBody());

app.keys = [`${process.env.APP_KEYS}`];

const CONFIG = {
    httpOnly: true,
    secure: true
}
app.use(session(CONFIG, app));

// Se asigna el router a la aplicación
app.use(router.routes());

// Se inicia el servidor
// Código extraído de la capsula de sequelize
orm.sequelize.authenticate().then(() => {
    console.log('Se pudo conectar a la base de datos.');
    app.listen(port, (err) => {
        if (err) {
            return console.error('Error al iniciar el servidor:', err);
        }
        console.log(`Escuchando en el puerto ${port}`);
        return app
    });
}).catch((err) => console.error('No se pudo conectar a la base de datos:', err));