const User = require("../models/User");
const crypto = require("crypto") ;
const bcrypt = require("bcryptjs");
const { mailSender } = require("../utils/sendMail");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not registered",
      });
    } ;
    const token = crypto.randomUUID();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { token: token, resetPasswordExpires: Date.now() + 3 * 60 * 1000 },
      { new: true }
    );
    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
        email,
        "Password Reset",
        `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
        success: true,
        message:
            "Email Sent Successfully, Please Check Your Email to Continue Further",
    });

  } catch (error) {
    return res.status(401).json({
        success : false ,
        message : "Error while creating password token"
    }) ;
  } 
};
 
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if ((!userDetails.resetPasswordExpire > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};