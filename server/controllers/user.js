const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const getUser = async (req, res) => {
    const userId = req.user.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new UnauthenticatedError("User doesn't exist");
    }

    res
        .status(StatusCodes.OK)
        .json({
            user: { userId: user._id, name: user.name, role: user.role }
        });
}

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res
        .status(StatusCodes.OK)
        .json({
            msg: "All user fetched",
            users: users
        });
}

module.exports = {
    getUser,
    getAllUsers,
}