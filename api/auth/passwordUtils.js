const bcrypt = require("bcrypt");

const hashPassword = async(password,hash)=>{
   return await bcrypt.hash(password,hash);
}

async function validatePassword (password,hashedPassword){
    return bcrypt.compare(password,hashedPassword);
}

module.exports = {hashPassword , validatePassword}