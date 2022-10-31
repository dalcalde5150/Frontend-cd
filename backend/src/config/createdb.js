const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || '127.0.0.1',
  database: "postgres",
});

client.connect();

client.query('CREATE DATABASE e0_app_development', (err, res) => {
  console.log(err, res);
  client.end();
});