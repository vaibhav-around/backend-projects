const z = require('zod');
const { errorResponse, successResponse } = require('../utils/response');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const DB = require('../db/dbConfig');
const jwt = require('jsonwebtoken');

// declaration and definitions
dotenv.config();
const signupValidation = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});
const jwtKey = process.env.JWT_KEY;

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const signup = async (req, res, next) => {
  try {
    signupValidation.parse(req.body);
  } catch (error) {
    return errorResponse(res, null, 'Please enter a valid input', 401);
  }

  // check if user is already logged in

  const userName = req.body.username;
  try {
    let sql = 'SELECT username from CR.users where username = $1';
    let query = await DB.query(sql, [userName]);
    // console.log(`Query Result: ${JSON.stringify(query)}`);
    
    if (query.rows.length > 0) {
      return errorResponse(res, null, 'User already exists', 409);
    }
  } catch (error) {
    console.log(`Error: `, error);
    return errorResponse(res, null, 'Some error occured', 500);
  }

  // hashing password
  const password = req.body.password;

  if(!saltRounds){
    console.log(`Salt rounds not found`);
    return errorResponse(res,null,"Some error occured",500);
  }
  const hashedPass = await bcrypt.hash(password, saltRounds);

  if (!hashedPass) {
    console.log('Password did not got hashed');
    return errorResponse(res, null, 'OOps some error occured', 500);
  }

  try {
    sql = 'INSERT into CR.users(username,password) values($1,$2)';
    query = await DB.query(sql, [userName, hashedPass]);

    return successResponse(res, null, 'User Created Successfully', 201);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return errorResponse(
      res,
      null,
      'OOps some error occured, please try again',
      500,
    );
  }
  res.send('Last signup route');
};

const login = async (req, res, next) => {
  try {
    signupValidation.parse(req.body);
  } catch (error) {
    return errorResponse(req,null,"Invalid Inputs", 400);
  }

  const userName = req.body.username;
  const password = req.body.password;
  let hashedPass = "";
  let userId;

  // console.log(userName);
  
  try {
    let sql = "SELECT * FROM CR.users WHERE username = $1";
    let query = await DB.query(sql, [userName]);

    // console.log(`Query: ${JSON.stringify(query)}`);
    
    if(query.rows.length == 0){
      return errorResponse(res,null, "user does not exist", 401);
    }

    hashedPass = query.rows[0].password;
    userId = query.rows[0].id;
    
  } catch (error) {
     console.log(`Error: ${error}`);
     return errorResponse(res,null,"OOps! Something went wrong", 500);
  } 

  // console.log(`Hashed pass: ${hashedPass}`);
  
  const passMatchingResult = bcrypt.compare(password, hashedPass);

  if(!passMatchingResult){
    return errorResponse(res,null,"Incorrect password",401);
  }

  if(!jwtKey){
    console.log("Jwt key missing");
    return errorResponse(res,null,"OOps!, Something went wrong", 500);
  }

  let token = jwt.sign({ id: userId, username: userName  }, jwtKey);

  if(!token){
     console.log(`Error: token did not generated`);
     return errorResponse(res,null,"OOps! Something went wrong", 500);
  }
  
  return successResponse(res,[{"key":token}],"Login successful",200);
  res.send('Not Implemented: Login route');
};

module.exports = { signup, login };
