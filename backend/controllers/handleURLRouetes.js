const URL = require("../model/url")
const ShortUniqueId = require("short-unique-id")
const { randomUUID } = new ShortUniqueId({ length: 8 });

const getAllUrls = async(req,res)=>{
    console.log(req.user._id);

    let allurl = null

    // if(!req.user){
    //     return res.json({
    //         status : false,
    //         message : "need to sign in"
    //     })
    // }

    if(req.user.role == "ADMIN"){
        allurl = await URL.find({})

    }
    else{
        allurl = await URL.find({createdBy : req.user._id})
    }
    
     
    if(!allurl){
        return res.json({
            status : false,
            message : "need to sign in"
        })
    }
    return res.json({
        status : true,
        urls : allurl,
        name : req.user.username,
        role : req.user.role
    })
}

const generateShortUrl = async(req,res)=>{
    let shortid = randomUUID();
    let data = req.body.data
    if(!data || !data.url){
        return res.status(400).json({message : "URL is required",status : false})
    }

    const new_url = new URL({
        shortID : shortid,
        redirectUrl : data.url,
        visited : [],
        createdBy : req.user._id,
        createdUser : req.user.username
    })
    let generated_url = `${process.env.FRONTEND_URL}/api/${shortid}`
    console.log("generated url : "+generated_url);
    
    await new_url.save()
    .then(()=>{
        res.status(201).json({
            message : "Succesfully generated",
            shorturl : shortid,
            status : true,
            url : generated_url
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
    }).catch(()=>{
        res.end("error");
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
    getAllUrls,
    generateShortUrl,
    redirectUrl,
    getanalytics
}