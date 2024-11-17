const User = require("../model/user")
const {v4:uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

const {hashPassword,verifyPassword} = require("../service/bcrypt")


const handleUserLogout = async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        success : true
    })
}


const handleUserSignup = async(req,res)=>{

    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password : req.body.password
    })

    newUser.password = await hashPassword(newUser.password)

    await newUser.save()
    .then(()=>{
        console.log('User added to database');
        return res.status(201).json({
            success : true,
            message : "Successfully added to database"
        })
        
    })
    .catch(()=>{
        console.log('error in adding user to database');
        return res.status(400).json({
            success : false,
            message : "error in  adding to database"
        })
    })
}

const handleUserLogin = async(req,res)=>{

    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        console.log('invalid username or password');
        return res.status(404).json({
            success : false,
            message : "Invalid Email id or Password"
        })
    }

    let value = await verifyPassword(password,user.password)

    if(!value){
        return res.status(404).json({
            success : false,
            message : "Invalid Password"
        })
    }

    
    const token = setUser(user)
    res.cookie('token',token)

    console.log('logged in succesfully');
    return res.status(200).json({
        success : true,
        message : "Logged in Successfully",
        token : token,
        uidName : user._id
    })
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
}