const express = require("express")
const {generateShortUrl,redirectUrl,getanalytics} = require("../controllers/handleURLRouetes")

const router = express.Router()


router.post("/url",generateShortUrl)

router.get("/:id",redirectUrl)

router.get("/url/analytics/:id",getanalytics)



module.exports = router