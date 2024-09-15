const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String ,
        unique : true ,
        require : true
    },
    password : {
        type : String ,
        require : true
    }
},{timestamps:true});

const exe_schema = mongoose.model("user",userschema)

module.exports = exe_schema