const {
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    attachCookiesToResponse,
} = require("../utils");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const {
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
} = require("../errors");
const origin = "https://auth-workflow.netlify.app";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new BadRequestError("Email already exists");
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const verificationToken = await crypto.randomBytes(40).toString("hex");
    const user = await User.create({ name, email, password, role, verificationToken });

    const emailUrl = await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin,
    });

    res
        .status(StatusCodes.CREATED)
        .json({
            msg: `Success! Please go to this link to verify account → ${emailUrl}`
        });
}

const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError("User doesn't exist");
    }

    if (user.verificationToken !== verificationToken) {
        throw new UnauthenticatedError("Token doesn't match");
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Account Confirmed Successfully" });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError("User doesn't exist");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Password is not correct");
    }

    if (!user.isVerified) {
        const emailUrl = await sendVerificationEmail({
            name: user.name,
            email: user.email,
            verificationToken: user.verificationToken,
            origin,
        });

        throw new UnauthenticatedError(`Please go to this link to verify account → ${emailUrl}`);
    }

    const tokenUser = createTokenUser(user);

    let refreshToken = "";
    const existingToken = await Token.findOne({ user: user._id });

    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new UnauthenticatedError("Invalid Credentials");
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user: tokenUser, refreshToken });
        res
            .status(StatusCodes.OK)
            .json({
                msg: "user logged in successfully",
                user: tokenUser,
            });
        return;
    }

    refreshToken = crypto.randomBytes(40).toString("hex");
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res
        .status(StatusCodes.OK)
        .json({
            msg: "user logged in successfully",
            user: tokenUser,
        });
}

const logout = async (req, res) => {
    const cookies = ["accessToken", "refreshToken"];
    cookies.forEach(cookie => res.clearCookie(cookie));
    res
        .status(StatusCodes.OK)
        .json({ msg: "user logged out" });
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new BadRequestError("Please provide valid email");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("User doesn't exist");
    }

    const passwordToken = crypto.randomBytes(30).toString("hex");
    const emailUrl = await sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        passwordToken: passwordToken,
        origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();

    res
        .status(StatusCodes.OK)
        .json({ msg: `Please go to this link to reset your password → ${emailUrl}` });
}

const resetPassword = async (req, res) => {
    const { email, password, passwordToken } = req.body;
    if (!email || !password || !passwordToken) {
        throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("User doesn't exist");
    }

    const currentDate = new Date();

    if (user.passwordToken === passwordToken && user.passwordTokenExpirationDate > currentDate) {
        user.password = password;
        user.passwordToken = null;
        user.passwordTokenExpirationDate = null;
        await user.save();
    }

    res
        .status(StatusCodes.OK)
        .json({ msg: "Password reseted successfully" });
}

module.exports = {
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    forgotPassword,
}