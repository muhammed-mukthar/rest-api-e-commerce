const router=require('express').Router()
const User=require('../models/User')
const  Cryptojs=require('crypto-js');
const { json } = require('express');
const jwt=require('jsonwebtoken')
const authController=require('../controllers/authController')



//register


router.post('/register',authController.User_register);

//Login


router.post('/login',authController.user_Login )


module.exports=router