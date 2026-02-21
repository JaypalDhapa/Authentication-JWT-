// const {Resend} = require("resend");
const transporter = require("./transporter");
const {generateOtp} = require("../services/otpServices");
const {otpTemplate} = require("../templates/verifyEmailTemplate");

// const resend = new Resend("re_Kfn3SNht_MCdfX5bdrjSyjGqcWJYNdeiv");

/*
Resend Email logic
async function sendOtpEmail() {
    const otp = generateOtp();
    
    const response = await resend.emails.send({
        from:"onboarding@resend.dev",
        to:"jaypaldhapa7990@gmail.com",
        subject:"Hello from node.js server",
        html:otpTemplate(otp)
        });
        
        console.log(response);
        }
        */
       
//Nodemailer

const sendOtpEmail = async (to,otp) =>{
    try{
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject:"OTP Verification",
            html:otpTemplate(otp)
        });
    }catch(err){
        console.log("main mail error",err);
    }
};


module.exports = sendOtpEmail;

