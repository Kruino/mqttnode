const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

//Creates new user
router.post("/user", authenticateToken, userController.registerUser);
//login to a user and returns a token.
router.post("/login", userController.loginUser);

module.exports = router;
