const transaccionProduct = {};
const Transaccion = require('../models/transaccion-product.model')
const Product = require('../models/product.model')
const moment = require('moment')

transaccionProduct.addExit = (req,res) => {
    const { idProduct, quantity, type } = req.body

    Product.findOne({_id:idProduct},(err,response) => {
        if(err) return res.status(500).send({ message:`Error al registrar la salida` })

        if(!(response.quantity >= quantity))
            return res.status(401).send({ message:'La cantidad de productos de salida es mayor a la que posee actualmete'})
        else{
            const transaccionProduct = new Transaccion({
                idProduct,
                nameProduct:response.name,
                quantity,
                type
            })

            transaccionProduct.save((err,response) => {
                if(err) return res.status(500).send({ message:`Error al registrar la salida ${err}` }) 

                const total = response.quantity - quantity
                Product.updateOne({ _id:idProduct },{ quantity:total },(err,response) =>{
                    if(err) return res.status(500).send({ message:`Error al registrar la salida` })

                    return res.status(200).send({ message:'Salida registrada exitosamente' })
                })
            })
        }    
        
    })
}

transaccionProduct.addEntry = (req,res) => {
    const { idProduct, quantity, type } = req.body;

    Product.findOne({_id:idProduct},(err,response) => {
        if(err) return res.status(500).send({ message:`Error al registrar la entrada` })

        const total = response.quantity + quantity;

        const transaccionProduct = new Transaccion({
            idProduct,
            nameProduct:response.name,
            quantity,
            type
        })

        transaccionProduct.save((err,response) => {
            if(err) return res.status(500).send({ message:`Error al registrar la entrada` })

            Product.updateOne({_id:idProduct},{quantity:total},(err,response) => {
                if(err) return res.status(500).send({ message:`Error al registrar la entrada` })
    
                return res.status(200).send({ message:'Entrada registrada exitosamente' })
            })

        })

    })
}

transaccionProduct.getAll = (req,res) => {
    Transaccion.find((err,response) => {
        if(err) return res.status(500).send({ message:`Error al obtener las transacciones de los productos` })

        return res.status(200).send(response)
    })
}

module.exports = transaccionProduct;