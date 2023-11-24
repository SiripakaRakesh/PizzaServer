const nodemailer = require('nodemailer');

//Send Mail:-
module.exports.sendEmailIngredient = async (ingredientName, userEmail) => {
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
            subject: "Limited Ingredients In Your Shop",
            html: `
            <h3 style="color: blue;">Please See Your Pizza Ingredients.</h3>
            <h1 style="color: red;">${ingredientName}.</h1>
            <h3>Please Increase Your Stock</h3>
          `
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