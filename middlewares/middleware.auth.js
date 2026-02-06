const jwt = require("jsonwebtoken");


const authMiddleware = async (req,res,next) => {
    const header = req.headers.authorization.split(" ")[1];
    if(!header){
        res.redirect('/v1/auth/login');
    }

}