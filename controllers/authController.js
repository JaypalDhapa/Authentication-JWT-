const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require("../utils/generateToken");

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

exports.registerUser = async (req,res)=>{
    const {name,email,password} = req.body;

    try{
        const userExists = await User.findOne({email});

        //check is email already Exists ??
        if(userExists){
            return res.json({
                success:false,
                message:"user already exists"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create new user
        await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.json({
            success:true,
            message:"User created"
        });
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"faild to create user"
        });
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
  