const mongoose = require("mongoose")


const urlSchema = new mongoose.Schema({
    shortID : {
        type : String,
        require : true,
        unique : true
    },
    redirectUrl : {
        type : String,
        require : true,
    },
    visited : [{timestamp : {
        type : String
    }}]
},{timestamps:true})

const url_rou = mongoose.model("urls",urlSchema)

module.exports = url_rou