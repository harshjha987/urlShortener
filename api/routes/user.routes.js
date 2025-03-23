const express = require("express");
const {userSignup, userSignin, userLogOut,changePassword, userUrls} = require("../controllers/user.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { refreshAccessToken } = require("../auth/tokenUtils");


const router = express.Router();

router.post("/signup",userSignup);

router.post("/signin",userSignin)
router.post("/logout",verifyJwt,userLogOut)
router.post("/refresh-token",refreshAccessToken)
router.get("/urls",verifyJwt,userUrls)

router.get("/auth/check", verifyJwt, (req, res) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({
                authenticated: false,
                message: "User is not logged in or token is invalid",
            });
        }

        
        res.status(200).json({
            authenticated: true,
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            },
            message: "User is logged in",
        });
    } catch (error) {
        console.error("Error in /check route:", error);
        res.status(500).json({
            authenticated: false,
            message: "Internal server error",
        });
    }
});


router.post("/changePassword",verifyJwt,changePassword)

module.exports = router;