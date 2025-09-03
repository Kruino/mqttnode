const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const authenticateToken = require("../middleware/auth");
//Removes devices ability to upload to db
router.post("/unverify", authenticateToken, deviceController.unverifyDevice);
//logs the device in and returns a token
router.post("/verify", deviceController.verifyDevice);
//Add the device to allowed devices
router.post("/", authenticateToken, deviceController.addDevice);
//Updates the devices location
router.post("/location", authenticateToken, deviceController.UpdateDeviceLocation);

module.exports = router;
