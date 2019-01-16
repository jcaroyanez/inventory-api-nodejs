const express = require('express')
const routes = express.Router()
const categoryController = require('../controllers/category.controllers');

routes.post('/category',categoryController.add)
routes.put('/category',categoryController.update)
routes.get('/category',categoryController.getAll)
routes.delete('/category/:id',categoryController.deleted)

module.exports = routes;