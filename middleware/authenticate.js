const jwt = require("jsonwebtoken");
const userdb = require("../Schema/userSchema.js");
const adminuser = require("../Schema/AdminUserSchema")
const keysecret = process.env.SECRET_KEY 


const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,"123edcvgyhnbtredfhjkoiuytbnh");
        
        const rootUser = await userdb.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}

const Adminauthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,"secretkey");
        
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


module.exports = authenticate