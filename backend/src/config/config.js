require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DEV || 'e0_app_development',
        host: "db",
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST || 'e0_app_test',
        host: "db",
        dialect: 'postgres',
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};

module.exports = config;