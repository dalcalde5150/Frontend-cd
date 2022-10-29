const { Sequelize } = require('sequelize');
const { DataTypes } = require('@sequelize/core');
require('dotenv').config();

// DataBase Connection
// todo: crear conexion a base de datos
const sequelize = new Sequelize('e0_app_development', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    // host: 'db',
    dialect: 'postgres'
});

const Event = sequelize.define("\"Events\"", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    lat: {
        type: DataTypes.FLOAT
    },
    lon: {
        type: DataTypes.FLOAT
    },
    location: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.INTEGER
    },
    event_type: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

const User = sequelize.define("\"Users\"", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

const Job = sequelize.define("\"Jobs\"", {
    id_user: {
        type: DataTypes.INTEGER
    },
    id_event: {
        type: DataTypes.INTEGER
    },
    resultado: {
        type: DataTypes.FLOAT
    }
}, {
    freezeTableName: true
});

module.exports = { Event, User, Job };