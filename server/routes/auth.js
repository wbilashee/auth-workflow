const express = require("express");
const router = express.Router();
const {
    login,
    logout,
    register,
    verifyEmail,
} = require("../controllers/auth");
const { authenticateUser } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.delete("/logout", authenticateUser, logout);

module.exports = router;