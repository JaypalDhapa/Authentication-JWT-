const mongoose = require("mongoose");
const {getOtpExpiry} = require("../services/otpServices");


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    otp:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    expiresAt:{
        type:Date,
        required:true,
        default:getOtpExpiry()
    },
    attempts:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model("Otp",otpSchema);