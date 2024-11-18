const jwt = require('jsonwebtoken')

const key = process.env.AUTH_KEY

function setUser(user){
    // idToUserMap.set(id,user)
    // idToUserMap.forEach((val,key)=>{
    //     console.log(val+" <-value key-> "+key);
    // })

    const data = {
        _id : user._id,
        email : user.email,
        username : user.username,
        role : user.role
    }

    return jwt.sign(data,key);
}

function getUser(token){
    if(!token) return null
    // return idToUserMap.get(id)
    try {
        return jwt.verify(token,key)
    } catch (error) {
        return null;
    }
    
}


module.exports = {
    setUser,
    getUser
}