const express = require("express")
const {generateShortUrl,redirectUrl,getanalytics,getAllUrls} = require("../controllers/handleURLRouetes")
const URL = require("../model/url")

const router = express.Router()

router.get("/all",getAllUrls);

router.post("/",generateShortUrl)

router.get("/analytics/:id",getanalytics)



module.exports = router