const moogose = require('mongoose')
const User = require('../models/user.model')
const service = require('../services/jwt.services')
const userController = {};

userController.createUser = (req,res) => {
    res.json({message:'hola'})
}

userController.signUp = (req,res) =>{
  const user = new User({
    email:req.body.email,
    displayName:req.body.displayName,
    password:req.body.password
  });

  user.save((err,data) => {
  
      if(err) return res.status(500).send({ message:`Error al crear el usuario ${err}` })

      return res.status(200).send({ token: service.createToken(user) })
  })
}

userController.signIn = (req,res) =>{
    User.findOne({'email': req.body.email, },(err,user) => {
    
        if(err) return res.status(500).send({ message:err })

        if(!user) return res.status(404).send({ message:'No existe el usuario '})

        user.comparePassword(req.body.password,user.password).then(response =>{

            if(response){
                req.user = user;
                return res.status(200).send({ message:' Te has logueado correctamente', token: service.createToken(user)})
            }else{
                return res.status(404).send({ message:'Contraseña incorrecta '});
            }
              
        } ).catch(err => {
               return res.status(err.status).send({ message:err.message} )
        })
    }).select('email _id password')
}

module.exports = userController;