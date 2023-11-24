const nodemailer = require('nodemailer');

//Send Mail:-
module.exports.sendVerificationEmail = async (name, userEmail, userId) => {
    try {

        // Create a transporter with your email service provider configuration
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "justinlucky0064@gmail.com",
                pass: "22@Dec@2002",
            },
        });

        // Create the email template with the verification link containing the token
        const emailOptions = {
            from: "justinlucky0064@gmail.com",
            to: userEmail,
            subject: "Email Verification",
            html: `Click the following link to verify your email ${name}: 
            <a href="http://localhost:3000/verify/email?token=${userId}">Verify Email</a>`,
        };

        // Send the email
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.log("Error sending verification email:", error);
            } else {
                console.log("Verification email sent:", info.response);
                console.log(emailOptions);
            }
        });

    } catch (error) {
        console.log(error.massage);
    }
}