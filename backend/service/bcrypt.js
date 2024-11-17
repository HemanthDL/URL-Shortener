const bcrypt = require("bcrypt")


const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password,salt)
}

const verifyPassword = async(enteredpassword,databasepassword)=>{
    return await bcrypt.compare(enteredpassword,databasepassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}