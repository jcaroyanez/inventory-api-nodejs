const service = require('../services/jwt.services')

isAuth = (req,res,next) => {
    if(!req.headers.authorization) return res.status(403).send({ message:'No tiene autorizacion' })

    const token = req.headers.authorization.split(" ")[1]
    console.log('token',token)
    service.decodeToken(token)
    .then(response => {
       req.user = response 
       console.log('antes del next')
       next()
    })
    .catch(err => {
       return res.status(err.status).send({ message:err.message })
    })
}

module.exports = {
    isAuth
};