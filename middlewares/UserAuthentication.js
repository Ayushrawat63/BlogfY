
const { validateToken } = require("../services/authentication")


const authenticateUser=(req,res,next)=>{
    const token=req.cookies.jwtToken
    if(!token) return res.status(400).json({message:"Token is not available"})
    const decoded= validateToken(token)
    if(!decoded) return res.status(400).json({message:"Token is invalid"})
    req.user=decoded;
    next() 
}

module.exports={
    authenticateUser
}
