const express = require("express");

const { handleGenerateNewUrl, getAnalytics } = require("../controllers/url.controller");
const { verifyJwt } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/",verifyJwt,handleGenerateNewUrl)

router.get("/analytics/:shortId",getAnalytics)

module.exports = router