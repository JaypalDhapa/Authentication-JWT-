const jwt = require('jsonwebtoken');

const protect = (req,res,next)=>{
    let token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            msg:"Not authorized"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch(err){
        res.status(404).json({
            msg:"Token invalid"
        });
    }
};

module.exports = protect;