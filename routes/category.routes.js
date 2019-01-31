const express = require('express')
const routes = express.Router()
const categoryController = require('../controllers/category.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

routes.post('/category',authMiddleware.isAuth,categoryController.add)
routes.put('/category',authMiddleware.isAuth,categoryController.update)
routes.get('/category',authMiddleware.isAuth,categoryController.getAll)
routes.delete('/category/:id',authMiddleware.isAuth,categoryController.deleted)

module.exports = routes;