const pg = require('pg');
const { Pool }  = pg;




const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 10000,
})


const query = (text, params) => {
    return pool.query(text, params);
}



module.exports = {query};

