const jwt = require("jsonwebtoken");

const generateAccessToken = ()=>{
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

const generateRefreshToken = ()=>{
    return jwt.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : REFRESH_TOKEN_EXPIRY
    }
    )
}


module.exports = {generateAccessToken,generateRefreshToken}