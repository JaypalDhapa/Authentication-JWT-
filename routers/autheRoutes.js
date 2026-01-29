const express = require('express');
const {fetchUsers,registerUser,loginUser,logout} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.get("/auth/fetchUsers",fetchUsers);
router.post("/auth/register",registerUser);
router.post("/auth/login",loginUser);
router.post("/auth/logout",logout);

module.exports = router;
