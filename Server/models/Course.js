const mongoose = require("mongoose") ;

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String 
    },
    courseDescription  :{
        type : String
    } ,
    instructor : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    } ,
    whatYouWillLearn : {
        type : String 
    } ,
    price : {
        type : Number
    } ,
    courseContent : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Section"
    }] ,
    ratingAndReviews : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "RatingAndReviews"
    } ,
    thumbnail : {
        type : String ,
    } ,
    category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
    tag : {
        type : String
    } ,
    studentEnrolled : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }] ,
    status : {
        type : String ,
        enum : ["Draft","Published"]
    }
}) ;

module.exports = mongoose.model("Course",courseSchema)