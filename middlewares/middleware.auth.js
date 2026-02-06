require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const jwtToken = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
  const headerKey = req.header('Authorization').split(" ")[1];
  if (!headerKey) {
    res.redirect('/v1/auth/login');
  }
  try {
    let check = await jwt.verify(jwtToken, headerKey);
    if (check) {
      req.user = {
        userId: check.userId,
        username: check.username,
      };
    }
    next();
  } catch (error) {
    console.log(`Error while processing middleware`);
    return errorResponse(res, null, 'auth middleware problem', 400);
  }
};

module.exports = authMiddleware;
