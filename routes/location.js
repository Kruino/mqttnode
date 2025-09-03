const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const authenticateToken = require("../middleware/auth");

//Get all locations
router.get("/", authenticateToken, locationController.getLocations);

//Creates a new location
router.post("/", authenticateToken, locationController.createLocation);

module.exports = router;
