const express = require("express");
const router = express.Router();
const {
    login,
    register,
    verifyEmail,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyEmail);

module.exports = router;