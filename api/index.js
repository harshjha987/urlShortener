const express = require("express");
const urlRoute = require("./routes/url.routes.js")

const userRoute = require("./routes/user.routes.js")
const app = express();
const port = 8001;
const dotenv = require("dotenv");
const cors = require("cors");
const requestIp = require("request-ip");
const {URL} = require("./models/url.models")

const authRoute = require("./routes/auth.routes.js")
const cookieParser = require('cookie-parser')

dotenv.config({
    path : './.env'
})
const {connectDb} = require("./connectDb");
const { verifyJwt } = require("./middlewares/auth.middlewares");

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "https://shortrix.vercel.app"], 
    methods: ["POST", "GET"],
    credentials: true
  }));
  
app.get("/",(req,res)=>{
    res.send("Server is running");
})

app.use('/url',verifyJwt,urlRoute);

app.use("/users",userRoute);
app.use("/auth",authRoute)

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const ip = requestIp.getClientIp(req) || "Unknown IP";
        const referrer = req.get("Referer") || "Direct";

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitedHistory: {
                        timestamp: Date.now(),
                        ip: ip,
                        referrer: referrer
                    }
                }
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        if (req.headers["x-requested-with"] === "XMLHttpRequest") {
            return res.json({ originalUrl: entry.redirectUrl, shortId });
        }
        
        
        console.log(entry.redirectUrl)
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error in redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

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