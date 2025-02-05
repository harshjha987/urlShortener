
const shortid = require('shortid');
const {URL} = require("../models/url.models")

const handleGenerateNewUrl = async (req,res)=>{

    const body = req.body;

    if(!body.URL) return res.status(400).json({error : "Url is required"});
        const shortId = shortid();
        await URL.create({
            shortId : shortId,
            redirectUrl : body.URL,
            visitedHistory : []
        })
        return res.json({id : shortId})
}
const getAnalytics = async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks : result.visitedHistory.length,analytics : result.visitedHistory
    })

}

module.exports =  {handleGenerateNewUrl,getAnalytics}