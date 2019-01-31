const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controllers')
const transaccionProduct = require('../controllers/transaccion-product.controllers')
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/product',authMiddleware.isAuth,productController.add)
router.get('/product',authMiddleware.isAuth,productController.getAll)
router.put('/product',authMiddleware.isAuth,productController.update)
router.delete('/product/:id',authMiddleware.isAuth,productController.deleted)
router.post('/product/exit',authMiddleware.isAuth,transaccionProduct.addExit)
router.post('/product/entry',authMiddleware.isAuth,transaccionProduct.addEntry)
router.get('/product/transaccion',authMiddleware.isAuth,transaccionProduct.getAll)

module.exports = router;