const jwt = require("jsonwebtoken")
const {User} = require("../models/user.models")
const verifyJwt = async(req,res,next)=>{
    try {
        console.log("Cookies in request",req.cookies)
        console.log("Headers in Request:", req.headers);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("JWT TOKEN IS ",token)
        if(!token){
            return res.status(404).json({Error : "Unauthorised Request"})
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )
        if(!user){
    
            return res.status(400).json({error : "Invalid access token"});
    
        }
        req.user = user;
        next()
        
    } catch (error) {
        return res.status(400).json({error : error?.message ||  "Invalid access token"});
    }
}

module.exports = {verifyJwt}