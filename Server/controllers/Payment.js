const crypto = require("crypto");
const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/sendMail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide Course Id" });
  }

  let totalAmount = 0;

  for (let courseId of courses) {
    try {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Could not find the Course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student Already Enrolled in the Course",
        });
      }

      totalAmount += course.price;

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating payment order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    console.log("REQ", req.body);
    console.log("User", req.user);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    let body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await enrolledStudents(courses, userId); // Do not pass `res` here

      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Signature Mismatch",
      });
    }
  } catch (error) {
    console.error("Enrollment Error:", error.message);
    if (!res.headersSent) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const enrolledStudents = async (courses, userId) => {
  if (!courses || !userId) {
    throw new Error("Please Provide Data");
  }

  for (let courseId of courses) {
    try {
      const EnrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!EnrolledCourse) {
        throw new Error("Course Not Found");
      }

      const studentExists = await User.findOne({ _id: userId, courses: courseId });
      if (studentExists) {
        throw new Error("Student Already Enrolled");
      }

      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

    } catch (error) {
      console.error("Enrollment Error:", error.message);
      throw error; // Propagate error to be handled in verifyPayment
    }
  }
};

exports.sendPaymentSuccessfullEmail = async (req, res) => {
  const { orderId, amount, paymentId } = req.user;
  const userId = req.user.id;

  if (!orderId || !amount || !paymentId || !userId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.log("Error in Sending mail:", error.message);
    return res.status(400).json({
      success: false,
      message: "Could not send Email",
    });
  }
};
