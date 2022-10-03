const { Sequelize } = require('sequelize');
import { DataTypes } from '@sequelize/core';

// DataBase Connection
// todo: crear conexion a base de datos
const sequelize = new Sequelize('e0_app_development', 'admin', 'admin', {
    host: 'db',
    dialect: 'postgres'
})

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    }
})

const Job = sequelize.define('job', {
    user_id: {
        type: DataTypes.INTEGER
    },
    job_id: {
        type: DataTypes.INTEGER
    },
    resultado: {
        type: DataType.FLOAT
    }
})
