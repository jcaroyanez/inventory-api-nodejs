const express = require('express')
const router = express.Router()
const statsController = require('../controllers/stats.controllers')

router.get('/stats/count-register',statsController.countRegister)

module.exports = router;
