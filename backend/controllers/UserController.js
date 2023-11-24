const User = require("../models/users/user");
const bcrypt = require('bcrypt');
const emailSend = require('../services/VerificationEmail');
const registrationEmailSend = require('../services/RegistrationEmail');

module.exports.register = async (req, res) => {

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email address already registered' });
    }

    const { name, email, password, mobile, is_verified, is_admin } = req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({ email, password: hashedPassword, name, mobile, is_verified, is_admin });
    let result = await user.save();

    //Email Verification Code:-


    emailSend.sendVerificationEmail(name, email, result._id);
    registrationEmailSend.registrationEmail(name, email, result._id, password, mobile);


    result = result.toObject();

    delete result.password;
    delete result.is_verified;
    delete result.is_admin;
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }


};

module.exports.login = async (req, res) => {

  {
    console.log(req.body);
    const { email, password } = req.body;

    if (email && password) {
      let user = await User.findOne({ email });
      if (user) {
        // Compare the entered password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        let is_verified = user.is_verified;

        if (is_verified === 0) {
          res.send({ result: "Please verify Email" });
        }

        if (passwordMatch) {
          user = user.toObject();
          delete user.password;
          delete user.is_verified;
          res.send(user);
        } else {
          res.send({ result: "Invalid password" });
        }
      } else {
        res.send({ result: "No User Found" });
      }
    } else {
      res.send({ result: "No User Found" });
    }
  }


};

module.exports.forgot = async (req, res) => {
  {
    const { email, mobile } = req.body;
    const newPassword = req.body.newPassword;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ massage: "No User Found" });
      }

      // Check if the provided mobile number matches the user's mobile number
      if (user.mobile !== mobile) {
        return res.status(401).json({ massage: "Mobile number does not match" });
      }

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();


      res.json({ massage: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ massage: "Internal Server Error" });
    }
  }
}


module.exports.getUserId = async (req, res) => {
  {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        res.json({ name: user.name }); // Return the name as a JSON object
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

}