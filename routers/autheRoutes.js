const express = require('express');
const {
    fetchUsers,
    sendOtp,
    registerUser,
    loginUser,
    logout,
    getUserdata,
    verifyEmailOtp
    } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.get("/auth/fetchUsers",fetchUsers);
router.post("/auth/sendOtp",sendOtp);
router.post("/auth/register",registerUser)
router.post("/auth/login",loginUser);
router.post("/auth/logout",logout);
router.get("/auth/getUserdata",protect,getUserdata); 

router.post("/auth/otpVerify",verifyEmailOtp);

module.exports = router;
