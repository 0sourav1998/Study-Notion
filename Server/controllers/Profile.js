const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress") ;
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const { UploadImageToCloudinary } = require("../utils/UploadImageToCloudinary");


exports.updateProfile = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
      firstName,
      lastName,
    } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.gender = gender;
    profile.contactNumber = contactNumber;

    await profile.save();
    await userDetails.save();

    const updatedUserDetails = await User.findById(id).populate(
      "additionalDetails"
    );

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.uploadProfilePicture = async(req,res)=>{
  try {
    const {image} = req.files ;
    if(!image){
      return res.status(400).json({
        success : false ,
        message : "This Field is Required"
      })
    }
    const id = req.user.id;
    console.log(image,id)
    const user = await User.findById(id);
    console.log(user);
    const cloudinaryResponse = await UploadImageToCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME);
    if(!cloudinaryResponse){
      return res.status(404).json({
        success: false ,
        message : "Response Not Found"
      })
    }
    user.image = cloudinaryResponse?.secure_url;
    await user.save();
    return res.status(200).json({
      success : true ,
      message : "Image Uploaded Successfully" ,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    await Course.deleteMany({instructor : id})
    
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId:new mongoose.Types.ObjectId(userId),
      }).exec();
      courseProgressCount = courseProgressCount?.completedVideo.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.instructorStats = async (req, res) => {
  const instructorId = req.user.id;
  try {
    const allCourses = await Course.find({ instructor: instructorId });

    const courseData = allCourses.map((course) => {
      const totalEnrolledStudents = course.studentEnrolled.length;
      const totalAmoutGenerated = course.studentEnrolled.length * course.price;
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalEnrolledStudents,
        totalAmoutGenerated,
      };
      return courseDataWithStats;
    });
    return res.status(200).json({
      success: true,
      message: "Details fetched Successfully",
      courses: courseData,
    });
  } catch (error) {
    console.log(error.message);
  }
};
