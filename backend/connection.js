const mongoose = require("mongoose")


const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/url-shortener").then(()=>{
            console.log('Database connected successfully');
        })
    } catch (error) {
        console.log('Error in connecting to Database... : ',error);    
    }
}

module.exports = connectDB