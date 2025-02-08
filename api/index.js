const express = require("express");
const urlRoute = require("./routes/url.routes")

const userRoute = require("./routes/user.routes")
const app = express();
const port = 8001;
const dotenv = require("dotenv");
const {URL} = require("./models/url.models")

dotenv.config({
    path : './.env'
})
const {connectDb} = require("./connectDb")
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server is running");
})

app.use('/url',urlRoute);

app.use("/users",userRoute);

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push : {
            visitedHistory :{
                timestamp : Date.now()
            }
        }
    })
    res.redirect(entry?.redirectUrl)
})

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port : ${port}`);
    })
    console.log("MongoDb connected")

})
.catch(()=>{
    console.log("Error occured");
})
// app.listen(port,()=>{
//     console.log(`Server is running on port : ${port}`);
// })