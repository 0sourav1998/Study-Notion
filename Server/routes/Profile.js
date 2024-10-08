const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/Auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  getEnrolledCourses,
  instructorStats,
  uploadProfilePicture
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth , updateProfile)
router.post("/updatePic", auth , uploadProfilePicture)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructor",auth,isInstructor,instructorStats)

module.exports = router