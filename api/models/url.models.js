const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    shortUrl : {type: String,required : true},
    redirectUrl: { type: String, required: true },
    visitedHistory: [
        {
            timestamp: { type: Number },
            ip: { type: String },
            referrer: { type: String }
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });


const URL = mongoose.model("url",urlSchema);

module.exports = {URL};