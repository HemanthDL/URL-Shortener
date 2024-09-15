const URL = require("../model/url")
const ShortUniqueId = require("short-unique-id")
const { randomUUID } = new ShortUniqueId({ length: 8 });

const generateShortUrl = async(req,res)=>{
    let shortid = randomUUID();
    let data = req.body.data
    let id = req.body.id
    if(!data || !data.url){
        return res.status(400).json({message : "URL is required",status : false})
    }

    const new_url = new URL({
        shortID : shortid,
        redirectUrl : data.url,
        visited : [],
        createdBy : req.user._id,
    })
    await new_url.save()
    .then(()=>{
        res.status(201).json({
            message : "Succesfully generated",
            shorturl : shortid,
            status : true
        })
    })
    .catch(()=>{
        res.status(400).json({
            message : "Bad Request",
            status : false
        })
    })
}

const redirectUrl = async(req,res)=>{
    let id = req.params.id
    
    let url = await URL.findOneAndUpdate({
        shortID : id
    },{
        $push : {
            visited : {
                timestamp : Date.now().toString(),
            },
        },
    })
    
    res.redirect(url.redirectUrl);
}

const getanalytics = async(req,res)=>{
    let id = req.params.id
    let url = await URL.findOne({
        shortID : id
    })
    if(!url){
        return res.status(404).json({
            error : "URL not found"
        })
    }

    return res.json({
        totalVisites : url.visited.length,
        analytics : url.visited
    })
}

module.exports = {
    generateShortUrl,
    redirectUrl,
    getanalytics
}