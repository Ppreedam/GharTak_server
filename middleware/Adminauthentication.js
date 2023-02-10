const jwt = require("jsonwebtoken");
const adminuser = require("../Schema/AdminUserSchema")

const Adminauthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,"adminsecretkeyvfgbhjnhytfgiokpledswcgjhfrdes");
        
        const rootUser = await adminuser.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}

module.exports = Adminauthenticate;