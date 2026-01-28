const express = require('express');
const {fetchUsers,registerUser,loginUser,logout} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.get("/fetchUsers",fetchUsers);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect ,(req,res)=>{
    res.json({
        msg:"Welcome user"
    });
})
router.post("/logout",logout);

module.exports = router;
