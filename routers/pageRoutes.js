const express = require('express');
const path = require('path');
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"../public/index.html"));
});


router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/login.html"));
});

router.get("/profile",protect,(req,res)=>{
    res.sendFile(path.join(__dirname,"../protected/profile.html"));
});

module.exports = router;