require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookie_parser = require("cookie-parser")

const {checkForAuthentication,restrictTo} = require("./middleware/auth")
const {redirectUrl} = require('./controllers/handleURLRouetes')

const conn = require('./connection')

const URLrouter = require("./routes/url_route")
const Userroute = require("./routes/user")

const app = express()
const PORT = process.env.PORT

conn()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"], 
    credentials: true 
}));

app.use(cookie_parser())

// app.use(checkForAuthentication)


app.get("/",(req,res)=>{
    res.send("hello world!!1")
})

app.use("/url",checkForAuthentication,restrictTo(['NORMAL','ADMIN']),URLrouter)
app.get("/:id",redirectUrl)
app.use("/user",checkForAuthentication,Userroute)

app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`);
    
})