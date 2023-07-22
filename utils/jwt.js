const jwt= require("jsonwebtoken")

const genrateJWT = (payload,secretKey,expiresIn) =>{
    return jwt.sign(payload,secretKey,{expiresIn})
}

module.exports ={
    genrateJWT
}