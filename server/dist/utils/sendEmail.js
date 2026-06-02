import nodemailer from "nodemailer";
export const sendEmail = async ({ receiver_mail, subject, body }) => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const mail = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: receiver_mail,
        subject,
        html: body,
    };
    await transport.sendMail(mail);
};
//# sourceMappingURL=sendEmail.js.map