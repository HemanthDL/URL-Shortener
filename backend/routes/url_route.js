const express = require("express")
const {generateShortUrl,redirectUrl,getanalytics} = require("../controllers/handleURLRouetes")
const URL = require("../model/url")

const router = express.Router()

router.get("/all",async(req,res)=>{
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
        urls : allurl,
        name : req.user.username
    })
})

router.post("/",generateShortUrl)



router.get("/analytics/:id",getanalytics)



module.exports = router