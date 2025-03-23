const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitedHistory: [
        {
            timestamp: { type: Number },
            ip: { type: String },
            referrer: { type: String }
        }
    ],
    urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "URL", // Reference the URL model
    },
  ],
}, { timestamps: true });


const URL = mongoose.model("url",urlSchema);

module.exports = {URL};