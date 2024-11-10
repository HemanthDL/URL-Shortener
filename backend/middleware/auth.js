const {getUser} = require("../service/auth")

const restrictToLoggedUser = async(req,res,next)=>{
    console.log("Cookies:", req.cookies);
    
    const useruid = req.cookies?.uid

    console.log("sessionid from cookie",useruid);
    

    if(!useruid){
        return res.status(404).json({
            success : false,
            message : "Session id expired"
        })
    }

    const user = getUser(useruid)

    if(!user){
        return res.status(404).json({
            success : false,
            message : "User not found"
        })
    }

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedUser
}