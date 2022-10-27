const { Sequelize } = require('sequelize');
const { DataTypes } = require('@sequelize/core');
require('dotenv').config();

// DataBase Connection
// todo: crear conexion a base de datos
const sequelize = new Sequelize('e0_app_development', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    // host: 'db',
    dialect: 'postgres'
});

const User = sequelize.define(sequelize.User, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    }
});

const Job = sequelize.define(sequelize.JobResult, {
    user_id: {
        type: DataTypes.INTEGER
    },
    job_id: {
        type: DataTypes.INTEGER
    },
    resultado: {
        type: DataTypes.FLOAT
    }
});