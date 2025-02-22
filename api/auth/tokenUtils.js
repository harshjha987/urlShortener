const jwt = require("jsonwebtoken");
const {User} = require("../models/user.models")
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } 
    );
};


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken; // Save refresh token in DB

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while generating tokens");
    }
};

const refreshAccessToken = async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        return res.status(400).json({ message: "Unauthorised Request" });

    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if(!user){
            return res.status(401).json({message : "Invalid refresh token"})
        }

        if(incomingRefreshToken != user?.refreshToken){
            return res.status(404).json({message : "Refresh token is expired or used."})
        }

        const options = {
            httpOnly : true,
            secure : true
        }
        const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(200, {accessToken,refreshToken : newRefreshToken},"Access Token refreshed succesfully")
    } catch (error) {
        return res.status(400).json({message : "Invalid refresh Token"})
    }


}

module.exports = {generateAccessToken,generateRefreshToken,generateAccessAndRefreshToken}