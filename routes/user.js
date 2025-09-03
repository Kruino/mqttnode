const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

router.post("/user", authenticateToken, userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
