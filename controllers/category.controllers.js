const Category = require('../models/category.model')
const moment = require('moment')
const categoryController = {};

categoryController.add = (req,res) =>{
    const name = req.body.name

    Category.findOne({name},(err,response) =>{

        if(err) return res.status(500).send( {message:`Error al crear la categoria ${err}`} )

        if(response) return res.status(401).send( {message:'Esta categoria ya existe'} )

        const category = new Category({
            name
        })
    
        category.save((err,data) => {
            if(err) return res.status(500).send( {message:`Error al crear la categoria ${err}`} )
    
            return res.status(200).send({ message:'Categoria creada exitosamente'} )
        })

    })

}

categoryController.update = (req,res) => {
    const name = req.body.name;
    const id = req.body.id;
    
    Category.findOne({name,_id:{$ne:id}},(err,response) => {
        if(err) return res.status(500).send( {message:`Error al actualizar la categoria ${err}`} )

        if(response) res.status(401).send({message:"Esta categoria ya existe"})

        Category.updateOne({_id:id},{name,$set:{update_at:moment.now()}},(err,response) => {
            if(err) return res.status(500).send( {message:`Error al actualizar la categoria ${err}`} )
    
            return res.status(200).send({ message:'Categoria actulizada exitosamente'} )
        })      
    })
}

categoryController.getAll = (req,res) => {
    Category.find({deleted:0},(err,categorys) => {

        if(err) return res.status(500).send( {message:`Error al octener las categorias ${err}`} )

        return res.status(200).send(categorys);

    })
}

categoryController.deleted = (req,res) => {
    const { id } = req.params
    
    Category.updateOne({_id:id},{deleted:1},(err,response) =>{
        if(err) return res.status(500).send( {message:`ha ocurrido un error al eliminar la categoria ${err}`} )

        return res.status(200).send( {message:'Categoria eliminada exitosamente'})
    })
}




module.exports = categoryController;