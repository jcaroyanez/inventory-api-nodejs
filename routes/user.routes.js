const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user.controllers');
const { isAuth } = require('../middlewares/auth.middleware')

router.get('/hello',isAuth,userCtrl.createUser)
router.post('/signup',userCtrl.signUp)
router.post('/signin',userCtrl.signIn)

module.exports = router;
