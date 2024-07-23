const Course = require("../models/Course");
const User = require("../models/User");
const Tag = require("../models/Tag");
const { UploadImageToCloudinary } = require("../utils/UploadImageToCloudinary");

exports.createCousre = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
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
    //validation of tag
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    //upload to cloudinary
    const thumbnailImage = await UploadImageToCloudinary(
      thumbnail,
      CLOUDINARY_FOLDER_NAME
    );

    //creating newCourse

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      whatYouWillLearn,
      instructor: instructorDetails._id,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    // update User schema

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse } },
      { new: true }
    );

    // Add the new course to the tgs
    await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
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
    const { courseId } = req.body;
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("category")
      .exec();
      if(!courseDetails){
        return res.status(400).json({
          success : false ,
          message : `Could not find Course with ${courseId}`
        })
      }
      return res.status(200).json({
        success : false ,
        message : "Course Details Fetched Successfully",
        data : courseDetails
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while fetching Course Details",
    });
  }
};
