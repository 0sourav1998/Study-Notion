const CourseProgress = require("../models/CourseProgress");
const SubSectionModal = require("../models/SubSection");



exports.fetchCourseProgress = async(req,res)=>{
  try{
    const fetchCourseProgressData = await CourseProgress.find({}).populate("completedVideo")
    if(fetchCourseProgressData){
      return res.status(200).json({
        success : true ,
        message : "Course Progress Fetched Succesfully",
        data : fetchCourseProgressData
      })
    }
  }catch(error){
    console.log(error.message)
  }
}

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId  = req.user.id;
  try {
    const SubSection = await SubSectionModal.findById({ _id: subSectionId });
    if (!SubSection) {
      return res.status(400).json({
        message: "Sub Section not Found",
      });
    }
    const courseProgress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    });
    if(!courseProgress){
        const courseProgress = new CourseProgress({
            userId: userId,
            courseId: courseId,
            completedVideo: [subSectionId],
        })
        await courseProgress.save();
    }
    else{
        if(courseProgress.completedVideo.includes(subSectionId)){
            return res.status(400).json({message : "Video already completed"})
        }else{
          courseProgress.completedVideo.push(subSectionId);
        }
        courseProgress.save();
    }
    return res.status(200).json({
        success : true ,
        message : "Course Updated"
    })
  } catch (error) {
    console.log(error);
  }
};
