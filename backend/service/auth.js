const idToUserMap = new Map()

function setUser(id,user){
    idToUserMap.set(id,user)
    idToUserMap.forEach((val,key)=>{
        console.log(val+" <-value key-> "+key);
    })
}

function getUser(id){
    return idToUserMap.get(id)
}


module.exports = {
    setUser,
    getUser
}