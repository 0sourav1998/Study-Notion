const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

//send otp function
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email.........",email)
    const checkUserPresent = await User.find({ email });
    console.log("............",checkUserPresent)
    if (checkUserPresent.length > 0) {
      return res.status(401).json({
        success: false,
        message: "User Exists",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Generated OTP", otp);

    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }

    // create entry in db
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    console.log("OTP BODY......", otpBody);
    return res.status(200).json({
      success: true,
      message: "OTP Sent Suceessfully",
      otp,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while generating otp",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    //extract data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
      contactNumber,
    } = req.body;

    //check validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //matching password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password not match , Please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }
    // fetching recent most otp
    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("Recent Otp", recentOtp);
    console.log(otp)
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP is not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP not valid",
      });
    }

    const ProfileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    // password hasing
    const hashPassword = await bcrypt.hash(password, 10);
    //entry save in b
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      additionalDetails: ProfileDetails._id,
      contactNumber,
      accountType,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while Sign up , please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Extract data
    const { email, password } = req.body;
    // console.log(email,password)
    // Validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log("..............one")
    // Find user by email
    const user = await User.findOne({ email :  email }).populate("additionalDetails").exec();
      console.log("user...........",user)
    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered, please sign up first to continue",
      });
    }

    // Check if password matches
    if (await bcrypt.compare(password, user.password)) {
      // Create JWT payload
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      // Sign JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      console.log("token",token)
      // Set token and remove password from user object
      user.token = token;
      user.password = undefined;

      console.log("USER" ,user)

      // Cookie options
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
      };

      // Create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}
