const Category = require('../models/category.model');
const statsController = {};

statsController.countRegister = (req,res) =>{
    Category.find().count({deleted:0},(err,countCategory) => {
        if(err)
          return res.status(500).send({message:`Error al obtener la información ${err}`})
        
        return res.status(200).send({category:countCategory})  
    })
}

module.exports = statsController;