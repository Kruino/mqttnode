const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const authenticateToken = require("../middleware/auth");

router.post("/unverify", authenticateToken, deviceController.unverifyDevice);
router.post("/verify", deviceController.verifyDevice);
router.post("/", authenticateToken, deviceController.addDevice);
router.post("/location", authenticateToken, deviceController.UpdateDeviceLocation);

module.exports = router;
