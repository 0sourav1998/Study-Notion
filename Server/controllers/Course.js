const Course = require("../models/Course");
const User = require("../models/User");
const { UploadImageToCloudinary } = require("../utils/UploadImageToCloudinary");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //fetch instructor details
    const user = req.user.id;
    const instructorDetails = await User.findById(user);
    console.log("Instructor Details", instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    console.log(category);
    //validation of category
    const categoryDetails = await Category.findById(category);
    console.log("Category Details.........", categoryDetails);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    console.log("category details", categoryDetails);
    //upload to cloudinary
    const thumbnailImage = await UploadImageToCloudinary(
      thumbnail,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    //creating newCourse

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      whatYouWillLearn,
      instructor: instructorDetails._id,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    // update User schema
    console.log("New Course", newCourse);
    const instructor = await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse } },
      { new: true }
    );
    console.log("Instructor", instructor);
    // Add the new course to the tgs
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    console.log("Updated Category", updatedCategory);
    // return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: "Error while Course Creation",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
          //get id
          const {courseId} = req.body;
          //find course details
          const courseDetails = await Course.findById(
                                      courseId)
                                      .populate(
                                          {
                                              path:"instructor",
                                              populate:{
                                                  path:"additionalDetails",
                                              },
                                          }
                                      )
                                      .populate("category")
                                      //.populate("ratingAndreviews")
                                      .populate({
                                          path:"courseContent",
                                          populate:{
                                              path:"subSection",
                                          },
                                      })
                                      .exec();

              //validation
              if(!courseDetails) {
                  return res.status(400).json({
                      success:false,
                      message:`Could not find the course with ${courseId}`,
                  });
              }
              //return response
              return res.status(200).json({
                  success:true,
                  message:"Course Details fetched successfully",
                  data:courseDetails,
              })

  }
  catch(error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:error.message,
      });
  }
}