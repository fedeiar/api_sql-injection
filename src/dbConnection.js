const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

let pool;

pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
});

module.exports = pool;