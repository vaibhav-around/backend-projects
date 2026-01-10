const pgp = require('pg-promise');
const db = pgp(`postgress://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/
    ${process.env.DATABASE}}`);



async function operation(){
db.one('SELECT * FROM users AS value')
.then((data) => {
    console.log('DATA', data.value);
})
.catch((e) => {
    console.log(`Error:`, e);    
});
}


export {operation};