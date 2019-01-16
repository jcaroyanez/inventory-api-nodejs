const Product = require('../models/product.model')
const moment = require('moment')
const productController = {};

productController.add = (req,res) =>{
    const { name, sale_price, purchase_price, quantity, category } = req.body;
    
    Product.findOne({name},(err,response) => {
        if(err) res.status(500).send({ message:`Error al crear un producto ${err}` })

        if(response) res.status(401).send({ message:"Este producto ya esta agregado" })

        const product = new Product({
            name,
            sale_price,
            purchase_price,
            quantity,
            category
        })
    
        product.save((err,response) => {
            if(err) res.status(500).send( {message:`Error al crear un producto ${err}`} )
    
            return res.status(200).send({ message:'Producto agregado exitosamente' })
        })

    })
 }

 productController.update = (req,res) => {
     const { name, sale_price, purchase_price, quantity, category, id } = req.body;

     Product.findOne({name,_id:{$ne:id}},(err,response) => {
        if(err) return res.status(500).send({ message:`Error al actulizar el producto ${err}` })

        if(response) res.status(401).send({ message:"Este producto ya esta agregado" })

        Product.update({_id:id},{$set:{ updated_at:moment.now() } , name, sale_price, purchase_price, quantity, category },(err,response) => {
            if(err) return res.status(500).send({ message:`Error al actulizar el producto ${err}` })
   
            return res.status(200).send({ message:'Producto actulizado exitosamente'})
        })
   
     })
 }

 productController.getAll = (req,res) => {
     Product.find({ deleted:0 },(err,response) => {
        if(err)  return res.status(500).send({ message:`Error al obtener los productos ${err}` })

        return res.status(200).send(response)

     }).populate('category',"_id name")
 }

 productController.deleted = (req,res) => {
     const { id } = req.params;

     Product.updateOne({_id:id,deleted:1},(err,response) => {
        if(err) return res.status(500).send({ message:`Error al eliminar el producto ${err}` })

        return res.status(200).send({ message:'Producto eliminado exitosamente' })
     })

 }


module.exports = productController;