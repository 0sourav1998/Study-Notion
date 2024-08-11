const RatingAndReview = require("../models/RatingAndReviews") ;
const Course = require("../models/Course") ;
const RatingAndReviews = require("../models/RatingAndReviews");
const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        console.log("rating, review, courseId",rating, review, courseId)
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.getAvgRating = async(req,res)=>{
    try{
        const {courseId} = req.body ;
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            } ,
            {
                $group : {
                    _id : null ,
                    avgRating : { $avg : "$rating"}
                }
            }
        ]) ;
        console.log("Average Rating",result)
        if(result.length > 0){
            return res.status(200).json({
                success : true ,
                message : "Avg Rating fetched Successfully" ,
                avgRating : result[0].avgRating
            })
        }
        return res.status(200).json({
            success : true ,
            message : "No Rating given till now" ,
            avgRating : 0 ,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllReviews = async(req,res)=>{
    try{
        const allRatingAndReview = await RatingAndReviews.find({})
        .sort({rating : "desc"})
        .populate({
            path : "User" ,
            select : "firstName lastName email image"
        })
        .populate({
            path : "Course" ,
            select : "courseName"
        }).exec() ;
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allRatingAndReview,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body ;
        const selectedCategory = await Category.findById({_id : categoryId}).populate({path : "courses"}).exec() ;
        const differentCategory = await Category.findById({_id : {$ne : categoryId}}).populate({path : "courses"}).exec() ;
        return res.status(200).json({
            success : true ,
            message : "Category Fetched Successfully",
            data : {
                selectedCategory ,
                differentCategory
            }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching Category Details",
        })
    }
}
