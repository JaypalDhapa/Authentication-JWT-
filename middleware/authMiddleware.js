const jwt = require('jsonwebtoken');

const protect = (req,res,next)=>{
    // console.log("Cookies received:", req.cookies);
    
    let token = req.cookies.token;

    if(!token){
        // return res.status(401).json({
        //     msg:"Not authorized" 
        // });
        return res.redirect("/login");
    }
 
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.id;
        next();
    }catch(err){
        return res.status(401).json({
            msg:"Token invalid"
        });
    }
};

module.exports = protect;