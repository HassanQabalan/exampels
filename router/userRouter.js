const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const authUser = require('../helpers/jwt');

router.post('/registerUser', userController.register)
router.post('/loginUser', userController.login)
router.get('/forgotPassword/:phone', userController.forgotPassword)
router.put('/resetPassword', userController.resetPassword)
router.get('/getUserData', authUser, userController.getUserData)

router.post('/registerUserExample', userController.register_exampels)

module.exports=router
