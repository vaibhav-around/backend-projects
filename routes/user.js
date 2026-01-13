const express = require("express");
const router = express.Router();
const {errorResponse,successResponse} = require("../utils/response");



router.get("/", (req,res) => {
     return successResponse(res,null,"Hii, You reached home page",200);
});


module.exports = router;