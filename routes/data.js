const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authenticateToken = require("../middleware/auth");

router.get("/temperature", authenticateToken, dataController.GetTempsForLocation);
router.post("/temperature", authenticateToken, dataController.UploadTemp);
router.post("/Light", authenticateToken, dataController.UploadLight);

module.exports = router;
