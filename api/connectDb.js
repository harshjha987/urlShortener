const mongoose = require("mongoose");

const connectDb = async()=>{
    
       try {
          await mongoose.connect(`${process.env.MONGODB_URI}`);
       } catch (error) {
        console.log("MongoD connection failed");
       }
    
}

module.exports = {connectDb}