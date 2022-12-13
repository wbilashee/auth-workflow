const express = require("express");
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require("../middleware/auth");
const {
    getUser,
    getAllUsers
} = require("../controllers/user");

router.get("/me", authenticateUser, getUser);
router.get("/all", authenticateUser, authorizePermissions("admin"), getAllUsers);

module.exports = router;