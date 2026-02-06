const express = require("express");

// require application controller 
const app_controller = require("../controllers/Controller.app");


const router = express.Router();


router.get("/", app_controller.index);


router.post("/bookings", app_controller.create_booking);

router.get("/bookings", app_controller.get_bookings);

router.put("/bookings/:id", app_controller.update_booking);

router.delete("/bookings/:id", app_controller.delete_booking);

module.exports = router;