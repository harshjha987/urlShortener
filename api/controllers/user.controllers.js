const { hashPassword,validatePassword } = require("../auth/passwordUtils");
const { generateAccessAndRefreshToken } = require("../auth/tokenUtils");
const { User } = require("../models/user.models");



const userSignup = async(req,res)=>{
    try {
    const {username,email,password} = req.body;

    if(!(username || email || password)){
        return res.status(400).json({Error : "Please enter all details"});
    }
    
        const existingUser = await User.findOne({
            $or : [{email}, {username}]
        }).lean();

        if(existingUser){
            return res.status(400).json({error : "Username or email already exists"});
        }

        const hashedPassword = await hashPassword(password,10);
        const user = await User.create({
           username : username.toLowerCase() ,
            email,
            password : hashedPassword
    
        })

        const {password: _, ...createdUser} = user.toObject();
        
            return res.status(201).json({message : "User created Succefully", user : createdUser});
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
}

const userSignin = async(req,res)=>{
        try {
            const {email,password} = req.body;
    
            if(!(email || password)){
                return res.status(401).json({Error : "Enetr all the details"});
            }
    
            const user = await User.findOne({
             email
            })
    
            if(!user){
                return res.status(401).json({Error : "Invalid credentials"})
            }
    
            const isPasswordValid = await validatePassword(password,user.password)
            if(!isPasswordValid){
                return res.status(401).json({Error : "Wrong password"});
    
            }
            const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
            const loggedinUser = await User.findById(user._id).select("-password -refreshToken")
            const options = {
                httpOnly : true, //only server can modify
                secure : true
            }
            return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json({Message: "User loggedin Succesfully", User : loggedinUser,accessToken,refreshToken})
        } catch (error) {
            return res.status(500).json({error : error?.message});
        }

}

const userLogOut = async(req,res)=>{
    console.log(req.user)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )
   
    const options = {
        httpOnly : true,
        secure : true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({message : "User logged out succesfully"})
}
const changePassword = async(req,res)=>{
    const{oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await validatePassword(oldPassword,user.password)
    if(!isPasswordCorrect){
        return res.status(404).json({error :  "Invalid Password"})
    }
    user.password = newPassword
    await user.save({validateBeforeSave : false})
    return res
    .status(200)
    .json({message: "Password changed succesfully"})
}

module.exports = {userSignup , userSignin,userLogOut,changePassword};