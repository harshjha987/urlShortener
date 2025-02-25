const express = require("express");

const {verifyJwt} = require("../middlewares/auth.middlewares")

const router = express.Router()


router.get("/check",verifyJwt,(req,res)=>{
    if (!req.user) {
        return res.status(401).json({ authenticated: false, message: "User is not logged in" });
      }
    res.status(200).json({authenticated : true, user : req.user, message : "This user is logged in"})
})

module.exports = router