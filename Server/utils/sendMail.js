const nodeMailer = require("nodemailer") ;

const mailSender = async(email,title,body)=>{
    try{
        const transporter = nodeMailer.createTestAccount({
            host : process.env.HOST_NAME ,
            auth : {
                user : process.env.MAIL_USER ,
                pass : process.env.MAIL_PASS
            }
        }) ;

        const info = transporter.sendMail({
            from : "Study-Noton || Sourav" ,
            to : `${email}`,
            subject : `${title}` ,
            html : `${body}`
        })

        console.log(info)
        return info 
    }catch(error){
        console.log(error.message)
    }
}

module.exports = mailSender ;