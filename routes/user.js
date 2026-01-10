const express = require("express");
const router = express.Router();
const {errorResponse,successResponse} = require("../utils/response");



router.get("/", (req,res) => {
    res.successResponse(200,"Hii, You hit Homepage!");
});


module.exports = router;