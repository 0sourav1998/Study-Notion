const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/Auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  getEnrolledCourses,
  instructorStats
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth , updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Coursesu
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructor",auth,isInstructor,instructorStats)

module.exports = router