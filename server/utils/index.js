const {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
} = require("./jwt");
const createTokenUser = require("./createTokenUser");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");

module.exports = {
    createJWT,
    isTokenValid,
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    attachCookiesToResponse,
}