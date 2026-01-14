const pg = require('pg');
const { Pool }  = pg;
const dotenv = require("dotenv");


dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 10000,
});


const query = (text, params) => {    
    return pool.query(text, params);
}



module.exports = {query};

