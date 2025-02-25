const express = require("express");
const {userSignup, userSignin, userLogOut,changePassword} = require("../controllers/user.controllers");
const { verifyJwt } = require("../middlewares/auth.middlewares");


const router = express.Router();

router.post("/signup",userSignup);

router.post("/signin",userSignin)
router.post("/logout",verifyJwt,userLogOut)

router.post("/changePassword",verifyJwt,changePassword)

module.exports = router;