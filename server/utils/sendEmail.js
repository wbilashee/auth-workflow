const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: "'Bilashee' <wbilashee@gmail.com>",
        to,
        subject,
        html,
    });

    return nodemailer.getTestMessageUrl(info);
}

module.exports = sendEmail;