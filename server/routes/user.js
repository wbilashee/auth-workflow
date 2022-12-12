const express = require("express");
const router = express.Router();
const {
    authorizeRoles,
    authenticateUser,
} = require("../middleware/auth");
const {
    getUser,
    getAllUsers
} = require("../controllers/user");

router.get("/me", authenticateUser, getUser);
router.get("/all", [authenticateUser, authorizeRoles("admin")], getAllUsers);

module.exports = router;