const {sign,verify}= require('jsonwebtoken')

const jwtTokenCreation=(payload)=>{
    return sign(payload,process.env.JWT_KEY)
}

const validateToken=(token)=>{
   return verify(token,process.env.JWT_KEY)  
}

module.exports={
    jwtTokenCreation,
    validateToken
}