const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, locationController.getLocations);
router.post("/", authenticateToken, locationController.createLocation);

module.exports = router;
