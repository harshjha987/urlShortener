const { hashPassword,validatePassword } = require("../auth/passwordUtils");
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
            const loggedinUser = await User.findById(user._id).select("-password")
            return res.status(200).json({Message: "User loggedin Succesfully", User : loggedinUser})
        } catch (error) {
            return res.status(500).json({error : "error.message"});
        }

}

module.exports = {userSignup , userSignin};