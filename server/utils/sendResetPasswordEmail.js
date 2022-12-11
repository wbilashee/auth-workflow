const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, passwordToken, origin }) => {
    const resetUrl = `${origin}/reset-password?token=${passwordToken}&email=${email}`;
    const message = `<p>Please reset password by clicking on the following link : <a href="${resetUrl}">Reset Password</a></p>`;

    return sendEmail({
        to: email,
        subject: "Reset Password",
        html: `<h4>Hello, ${name}</h4>
        ${message}`,
    });
}

module.exports = sendResetPasswordEmail;