const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected mongoDB");
    }catch(err){
        console.log("Faild to connectDB");
        process.exit(1);
    }
} 

module.exports = connectDB;