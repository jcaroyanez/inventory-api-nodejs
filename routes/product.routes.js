const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controllers')
const transaccionProduct = require('../controllers/transaccion-product.controllers')

router.post('/product',productController.add)
router.get('/product',productController.getAll)
router.put('/product',productController.update)
router.delete('/product/:id',productController.deleted)
router.post('/product/exit',transaccionProduct.addExit)
router.post('/product/entry',transaccionProduct.addEntry)
router.get('/product/transaccion',transaccionProduct.getAll)

module.exports = router;