const express = require("express")
const {handleUserSignup,handleUserLogin,handleUserLogout} = require("../controllers/handleuser")

const router = express.Router()


router.post("/signup",handleUserSignup)

router.post("/login",handleUserLogin)

router.get("/logout",handleUserLogout)




module.exports = router