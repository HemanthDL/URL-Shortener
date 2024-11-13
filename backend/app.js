const express = require("express")
const cors = require("cors")
const cookie_parser = require("cookie-parser")

const {checkForAuthentication,restrictTo} = require("./middleware/auth")
const {redirectUrl} = require('./controllers/handleURLRouetes')

const conn = require('./connection')

const URLrouter = require("./routes/url_route")
const Userroute = require("./routes/user")

const app = express()
const PORT = 1927

conn()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: 'http://localhost:6969', 
    credentials: true 
}));
app.use(cookie_parser())

app.use(checkForAuthentication)

app.use("/url",restrictTo(['NORMAL','ADMIN']),URLrouter)
app.get("/:id",redirectUrl)
app.use("/user",Userroute)

app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`);
    
})