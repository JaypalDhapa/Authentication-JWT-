const mongoose = require('mongoose');

const usreSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("users",usreSchema);