const express = require("express") ;
const app = express() ;

const courseRoute = require("./routes/Course") ;
const profileRoute = require("./routes/Profile") ;
const userRoute = require("./routes/User") ;
const paymentRoute = require("./routes/Payment") ;

const {connectToMongo} = require("./config/database") ;
const {UploadImageToCloudinary} = require("./utils/UploadImageToCloudinary") ;
const cookieParser = require("cookie-parser") ;
require("dotenv").config() ;
const fileUpload = require("express-fileupload") ;
const cors = require("cors") ;
const { cloudinaryConnect } = require("./config/cloudinary");

const PORT = process.env.PORT || 4000 ;

app.use(express.json());

app.use(cookieParser()) ;

app.use(cors({
    origin : "http://localhost:3000" ,
    credentials:true,
})) ;

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect() ;

app.use("/auth",userRoute) ;
app.use("/profile",profileRoute) ;
app.use("/payment" ,paymentRoute) ;
app.use("/course",courseRoute) ;

connectToMongo() ;


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT,()=>{
    console.log(`App is listening to Port : ${PORT}`)
}) ;