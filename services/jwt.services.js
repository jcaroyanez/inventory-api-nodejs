const jwt = require('jwt-simple')
const moment = require('moment')
const { SECRET_TOKEN } = require('../config')

createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    }

   return jwt.encode(payload,SECRET_TOKEN)
}

decodeToken = (token) =>{
     return new Promise((resolve,reject) =>{
        try{
           const payload = jwt.decode(token,SECRET_TOKEN)

        if(payload.exp <= moment.unix()){
            reject({
                status:401,
                message:'El token ha inspirado'
            })
        }

        resolve(payload.sub)

        }catch(err){
            reject({
                status:500,
                message:'Token invalido'
            })
        }
    })
}

module.exports = {
    createToken,
    decodeToken
};