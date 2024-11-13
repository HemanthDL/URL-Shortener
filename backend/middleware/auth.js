const { get } = require("mongoose")
const {getUser} = require("../service/auth")

// const checkForAuthentication = (req,res,next)=>{
//     const authorizationHeaderValue = req.headers['authorization']

//     req.user = null

//     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
//         return next()
//     }

//     const token = authorizationHeaderValue.split("Bearer ")[1];

//     const user = getUser(token)

//     req.user = user
//     next()

// }

const checkForAuthentication = (req,res,next)=>{
    const tokencook = req.cookies?.token

    req.user = null

    if(!tokencook){
        return next()
    }

    const token = tokencook

    const user = getUser(token)

    req.user = user
    next()

}

const restrictTo = (roles = [])=>{
    return function(req,res,next){
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(404).json({
                success : false,
                message : "UnAuthorized or UnAuthenticated"
            })
        }

        return next()
    }
}

// const restrictToLoggedUser = async(req,res,next)=>{
//     // console.log("Cookies:", req.cookies);
    
//     // const useruid = req.cookies?.uid

//     console.log("headers : "+req.headers);
    

//     const userid = req.headers['authorization']

//     // console.log("sessionid from cookie",useruid);
    

//     if(!userid){
//         return res.status(404).json({
//             success : false,
//             message : "Session id expired"
//         })
//     }

//     const token = userid.split("Bearer ")[1];

//     const user = getUser(token)

//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : "User not found"
//         })
//     }

//     req.user = user
//     next()
// }

module.exports = {
    checkForAuthentication,
    restrictTo
}