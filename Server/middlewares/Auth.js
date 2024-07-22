const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Autharisation").replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        succcess: false,
        message: "Token is Invalid",
      });
    }
    try {
      // verify the token
      const decode = jwt.verify(token, JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Someting Went Wrong While Validating the Token",
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Student") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Students only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }
   
   
   //isInstructor
   exports.isInstructor = async (req, res, next) => {
       try{
              if(req.user.accountType !== "Instructor") {
                  return res.status(401).json({
                      success:false,
                      message:'This is a protected route for Instructor only',
                  });
              }
              next();
       }
       catch(error) {
          return res.status(500).json({
              success:false,
              message:'User role cannot be verified, please try again'
          })
       }
      }
   
   
   //isAdmin
   exports.isAdmin = async (req, res, next) => {
       try{    
              console.log("Printing AccountType ", req.user.accountType);
              if(req.user.accountType !== "Admin") {
                  return res.status(401).json({
                      success:false,
                      message:'This is a protected route for Admin only',
                  });
              }
              next();
       }
       catch(error) {
          return res.status(500).json({
              success:false,
              message:'User role cannot be verified, please try again'
          })
       }
      }