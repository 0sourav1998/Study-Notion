const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto")



exports.capturePayment = async(req,res)=>{
    const {courses} = req.body ;
    const userId = req.user.id ;
    if(courses.length === 0){
        return res.json({success : false , message : "Please provide Course Id"})
    } ;
    let totalAmount = 0 ;
    for(let courseId of courses){
        let course ;
        try{
            course = await Course.findById(courseId) ;
            if(!course){
               return res.status(400).json({
                    success : false ,
                    message : "Could not find the Course"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success : false ,
                    message : "Student Already Enrolled in the Course"
                })
            }
            totalAmount += course.price ;
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success : false ,
                message : error.message
            })
        }
    }
    const options = {
        amount : totalAmount * 100 ,
        currency : "INR" ,
        receipt : Math.random(Date.now()).toString()
    }
    // creating order
    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success : true ,
            message : paymentResponse
        })
    }catch(error){
        console.log(error)
    }
}

//payment verification

exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id ;
    const razorpay_payment_id = req.body?.razorpay_payment_id ;
    const razorpay_signature = req.body?.razorpay_signature ;
    const courses = req.body?.courses;
    const userId = req.user.id ;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success : false ,
            message : "Payment Failed"
        })
    }
    //ratta
    let body = razorpay_order_id + "|" + razorpay_payment_id ;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex") ;
    if(expectedSignature === razorpay_signature){
        // enrooled karwa do student ko
        await enrolledStudents(courses,userId,res)

        return res.status(200).json({
            success : true ,
            message : "Payment Verified"
        })
    }
    return res.status(400).json({
        success : false ,
        message : "Payment Failed"
    })
}

const enrolledStudents =async(courses,userId,res)=>{
    if(!courses || !userId || !res){
        return res.status(400).json({
            success : false ,
            message : "Please Provide Data"
        })
    }
    for(let courseId of courses){
        try{
            let EnrolledCourse = await Course.findByIdAndUpdate({_id : courseId},{$push : {studentsEnrolled :userId} } , {new : true})
            if(!EnrolledCourse){
                return res.status(400).json({
                    success : false ,
                    message : "Course Not Found"
                })
            }
            const enrolledStudent = await User.findByIdAndUpdate({_id : userId} , {$push : {courses : courseId}} , {new :true}) 
    
            // mail send
            const mailSend = await mailSender(enrolledStudent.email , `Successfully Enrolled to ${EnrolledCourse.courseName}`, courseEnrollmentEmail(EnrolledCourse.courseName , enrolledStudent.firstName))
            console.log("Email Sent Sucessfully ......",mailSend.response)
        }catch(error){
            console.log(error);
            return res.status(400).json({
                success :false ,
                message : error.message
            })
        }
       
    }
}


exports.sendPaymentSuccessfullEmail = async(req,res)=>{
    const {orderId,amount,paymentId} = req.user ;
    const userId = req.user.id ;
    if(!orderId || !amount || !paymentId || !userId){
        return res.status(400).json({
            success : false ,
            message : "All fields are required"
        })
    }
    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email ,
            "Payment Received" ,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100 , orderId ,paymentId)
        )
    }catch(error){
        console.log("error in Sending mail");
        return res.status(400).json({
            success : false ,
            message : "Could not send Email"
        })
    }
}

