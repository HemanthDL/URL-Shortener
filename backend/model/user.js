const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        unique : true ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "NORMAL"
    }
},{timestamps:true});

const exe_schema = mongoose.model("user",userschema)

module.exports = exe_schema