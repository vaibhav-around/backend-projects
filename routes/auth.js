const expres = require('express');
const router = expres.Router();
const {query} = require('../db/dbConfig');
const { successResponse, errorResponse } = require('../utils/response');


router.post('/signup', async (req,res) => {
    const reqData = req.body;
    // console.log(`Debug: ${JSON.stringify(reqData.username)}`);
    const result = await query('select * from users');
    console.log(`Result: ${result}`);
    
    return successResponse(res,null,"You hit signup route", 201);
})


module.exports = router;