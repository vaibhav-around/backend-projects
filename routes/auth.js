const expres = require('express');
const router = expres.Router();
const DB  = require('../db/dbConfig');
const { successResponse, errorResponse } = require('../utils/response');
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// declarations and definitions
dotenv.config();
const saltRounds = process.env.SALT_ROUNDS;

router.post('/signup', [
    check('username',"Please provide a name").not().isEmpty().isString(),
    check('password',"Please provide a proper password").not().isEmpty().isString(),
] , async (req,res) => {
    // validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return errorResponse(res,errors.array(),"Validation error",401);
    }
    
    // data fetching
    const reqData = req.body;
    let username = reqData.username;
    let password = reqData.password;

    // check if user already exist
    try{
    let sql = 'SELECT * FROM users WHERE name = $1';
    const response = await DB.query(sql,[username]);

    if(response.rows.length > 0){
        return errorResponse(res,null,"User alread exist!",409);
    };

    // user doesn't exist process further
    const hashedPass = await bcrypt.hash(password,parseInt(saltRounds));
    // console.log(`Hashed paasss: ${hashedPass}`);
    
    if(!hashedPass){
        throw new Error("Password did not get hashed");
    }
    sql = 'INSERT INTO users(name,password) values($1,$2)';
    const response2 = await DB.query(sql,[username,hashedPass]);

    console.log(JSON.stringify(response2));
    

    }catch(err){
        return errorResponse(res,null,err.message,409);
    }
   


    return successResponse(response,null,"Reached last point");
})


module.exports = router;