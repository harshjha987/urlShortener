const express = require("express");
const {userSignup, userSignin, userLogOut} = require("../controllers/user.controllers");
const { verifyJwt } = require("../middlewares/auth.middlewares");


const router = express.Router();

router.post("/signup",userSignup);

router.post("/signin",userSignin)
router.post("/logout",verifyJwt,userLogOut)

module.exports = router;