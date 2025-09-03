const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authenticateToken = require("../middleware/auth");

//Return all temperature values
router.get("/temperature", authenticateToken, dataController.GetTempsForLocation);
//Create a new temperature value
router.post("/temperature", authenticateToken, dataController.UploadTemp);
//Create a new light value
router.post("/Light", authenticateToken, dataController.UploadLight);

module.exports = router;
