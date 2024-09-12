const express = require("express")
const conn = require('./connection')
const URLrouter = require("./routes/url_route")

const app = express()
const PORT = 1927

conn()

app.use(express.json())

app.use(URLrouter)

app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`);
    
})