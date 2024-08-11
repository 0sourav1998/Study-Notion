const express = require("express") ;
const router = express.Router() ;
const {auth,isAdmin,isInstructor,isStudent} = require("../middlewares/Auth")


// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse , 
    getInstructorCourses,
    deleteCourse ,
    getFullCourseDetails ,
    deleteAllCourses
  } = require("../controllers/Course")
  
  
  // Categories Controllers Import
  const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    // categoryPageDetails,
  } = require("../controllers/Category")
  
  // Sections Controllers Import
  const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")
  
  // Sub-Sections Controllers Import
  const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/SubSection")
  
  // Rating Controllers Import
  const {
    createRating,
    getAvgRating,
    getAllReviews,
  } = require("../controllers/RatingAndReview")

  const {
    updateCourseProgress,
    fetchCourseProgress
  } = require("../controllers/courseProgress")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
router.delete("/deleteCourse", deleteCourse)
router.delete("/deleteAllCourses",auth,isInstructor,deleteAllCourses)
router.post("/editCourse",auth,isInstructor,editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress) ;

router.get("/fetchCourseProgress",auth,isStudent,fetchCourseProgress)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAvgRating)
router.get("/getReviews", getAllReviews)

module.exports = router