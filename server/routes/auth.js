const express = require("express");
const router = express.Router();
const {
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    forgotPassword,
} = require("../controllers/auth");
const { authenticateUser } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.delete("/logout", authenticateUser, logout);

module.exports = router;