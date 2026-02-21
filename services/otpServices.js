const crypto = require("crypto");

exports.generateOtp = () =>{
    return crypto.randomInt(100000,999999).toString();
};

exports.getOtpExpiry = ()=>{
    return Date.now()+5*60*1000;
}; 