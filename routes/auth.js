const express = require('express');
const auth_controller = require('../controllers/Controller.auth');
const router = express.Router();




router.post("/login", auth_controller.login);

router.post("/signup", auth_controller.signup);



module.exports = router;