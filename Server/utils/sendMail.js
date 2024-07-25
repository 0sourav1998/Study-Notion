const nodeMailer = require("nodemailer") ;

exports.mailSender = async(email,title,body)=>{
    try{
        const transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST ,
            auth : {
                user : process.env.MAIL_USER ,
                pass : process.env.MAIL_PASS
            }
        }) ;

        const info = await transporter.sendMail({
            from : "Study-Noton || Sourav" ,
            to : `${email}`,
            subject : `${title}` ,
            html : `${body}`
        })

        console.log("info.............",info)
        return info 
    }catch(error){
        console.log(error.message)
    }
}

