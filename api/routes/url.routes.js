const express = require("express");

const { handleGenerateNewUrl, getAnalytics } = require("../controllers/url.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/",verifyJwt,handleGenerateNewUrl)

router.get("/analytics/:shortId",getAnalytics)

module.exports = router