const User = require('../model/userSchema')




exports.getUsers = (async(req,res)=>{

    const users = await User.find()
    
    return res.status(200).json('all users',users)

})

