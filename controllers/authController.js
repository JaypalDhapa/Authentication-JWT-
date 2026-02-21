const User = require('../models/user');
const Otp = require("../models/otp")
const bcrypt = require('bcrypt');
const generateToken = require("../utils/generateToken");
const sendOtpEmail = require("../services/emailService");
const {generateOtp} = require("../services/otpServices");

exports.fetchUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.json({
            users
        })
    }catch(err){ 
        res.json({
            sucess:false,
            message:"faild to Fetch all users"
        })
    }
}

exports.sendOtp = async (req,res)=>{
    const {email} = req.body;

    try{
        const userExists = await User.findOne({email});

        //check is email already Exists ??
        if(userExists){
            return res.json({
                success:false,
                message:"user already exists"
            })
        }

        const otp = await generateOtp();
        
       await Otp.deleteMany({email});

       //Save New OTP
       await Otp.create({
        email,
        otp,
        expiresAt:new Date(Date.now() +5 *60*1000) //5minutes
       })

        //send email
        await sendOtpEmail(email,otp);

        res.json({
            success:true,
            message:"OTP sent successfully"
        });

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"faild to send otp"
        });
    }
}

exports.verifyEmailOtp = async (req,res)=>{
    const {email,otp} = req.body;

    try{
        const otpRecord = await Otp.findOne({
            email,
            otp,
            expiresAt:{ $gt:new Date()}
        });

        
        if(!otpRecord){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired OTP"
            })
        }
        
        otpRecord.isVerified = true;
       

       res.status(200).json({
        success:true,
        message:"Otp verified successfully"
       })

    }catch(err){
        res.json({
            error:err
        })
    }
}

//Complete Registration

exports.registerUser = async (req,res)=>{
    const {fullName,email,password,otp} = req.body;

    try{

        //verify OTP again
        const otpRecord = await Otp.findOne({
            email,
            otp,
            expiresAt:{$gt:new Date()}
        });

        if(!otpRecord){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired OTP"
            })
        }

        
         //Check if user already exists 
         const existingUser = await User.findOne({email});
         if(existingUser){
             return res.status(400).json({
                 success:false,
                 message:"Email already registered"
             });
         }

         
         /*
         
        //is verified OTP
        const otpRecord = await Otp.findOne({email});
    
         console.log(otpRecord);

        if(!(otpRecord.isVerified)){
            return res.status(400).json({
                success:false,
                message:"Otp not verified please verify"
            });
        }
        */
        
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create new user
        await User.create({
            fullName,
            email,
            password:hashedPassword
        });

        //Delete used OTP
        await Otp.deleteMany({email});

        res.json({
            success:true,
            message:"User created"
        });
        
    }catch(err){

    }
}

exports.loginUser = async (req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                sucees:false,
                message:"User not found"
            });
        }

        //check password

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"wrong password"
            })
        }
        const token = generateToken(user._id);

        //set cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:24*60*60*1000
        });
        res.json({
            msg:"Login successful"
        })
    }catch(err){
        res.status(500).json({
            sucess:false,
            message:"faild to login"
        })
    }
}

exports.logout = async (req, res) => {
    try{
        console.log("requist come inside logout router");
        res.clearCookie("token");
        return res.json({
            success:true
        })

    }catch(err){
        res.json({
            success:false,
            msg:"logout err from server"
        })
    }
  };

  exports.getUserdata = async (req,res)=>{
    try{
        const user = await User.findById(req.userId).select("name");

        res.json({
            success:true,
            name:user.name
        });
    }catch(err){
        res.json({
            success:false,
            msg:"faild to get name from database"
        })
    }
  }
  

  exports.verifyOtp= async (req,res)=>{
    const {email,otp}= req.body;
    try{
        sendOtpEmail(email);
        

    }catch(err){

    }
  }