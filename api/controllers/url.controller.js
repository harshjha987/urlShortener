
const shortid = require('shortid');
const {URL} = require("../models/url.models")

const handleGenerateNewUrl = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user?._id

        if (!body.URL) return res.status(400).json({ error: "Url is required" });

        const shortId = shortid();
        await URL.create({
            shortId: shortId,
            redirectUrl: body.URL,
            visitedHistory: [],
            userId
        });

        console.log("Generated Short ID:", shortId);

        return res.json({ shortId }); // ✅ Return only shortId, not shortUrl
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
};

const getAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        const locations = result.visitedHistory.map(entry => entry.ip); // Replace with actual geolocation lookup
        const referrers = result.visitedHistory.map(entry => entry.referrer);

        return res.json({
            totalClicks: result.visitedHistory.length,
            locations,
            referrers
        });

    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports =  {handleGenerateNewUrl,getAnalytics}