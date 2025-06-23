const jwt = require('jsonwebtoken')


exports.verifyToken = ((req,res,next)=>{
     const authHeader = req.headers.authorization
     if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({message:"Token is not Found"})
     }
     const token = authHeader.split(' ')[1]
     try{
        const decode = jwt.verify(token,'the_secret_key')
        req.user = decode
        next()
     }catch(err){
        res.status(500).json({message:err.message})
     }
})

