require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DEV || 'e0_app_development',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST || 'e0_app_test',
        host: process.env.DB_HOST || '127.0.0.1',
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