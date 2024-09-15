const express = require("express")
const {generateShortUrl,redirectUrl,getanalytics} = require("../controllers/handleURLRouetes")
const URL = require("../model/url")

const router = express.Router()

router.post("/all",async(req,res)=>{
    console.log(req.user._id);
    
    const allurl = await URL.find({createdBy : req.user._id})
    if(!allurl){
        return res.json({
            status : false,
            message : "need to sign in"
        })
    }
    return res.json({
        status : true,
        urls : allurl
    })
})

router.post("/",generateShortUrl)



router.get("/analytics/:id",getanalytics)



module.exports = router