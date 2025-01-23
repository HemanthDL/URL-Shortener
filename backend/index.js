require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookie_parser = require("cookie-parser")
const path = require("path")

const {checkForAuthentication,restrictTo} = require("./middleware/auth")
const {redirectUrl} = require('./controllers/handleURLRouetes')

const conn = require('./connection')

const URLrouter = require("./routes/url_route")
const Userroute = require("./routes/user")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookie_parser())
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["POST", "GET"], 
//     credentials: true 
// }));
app.use(cors())

// app.use(checkForAuthentication)

app.use("/api/url",checkForAuthentication,restrictTo(['NORMAL','ADMIN']),URLrouter)
app.get("/api/:id",redirectUrl)
app.use("/api/user",checkForAuthentication,Userroute)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../","frontend","dist","index.html"))
    })
}

app.get("/",(req,res)=>{
    res.send("hello world!!1")
})


app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`);
    conn()
})