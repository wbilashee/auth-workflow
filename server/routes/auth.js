const express = require("express");
const router = express.Router();
const {
    register,
    verifyEmail,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/verify-email", verifyEmail);

module.exports = router;