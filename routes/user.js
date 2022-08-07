const User = require('../models/User')
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require('./verifytoken')
const userController=require('../controllers/userController')
const router=require('express').Router()
//update user
router.put("/:id",verifyTokenandAuthorization,userController.user_Update)

//delete

router.delete('/:id',verifyTokenandAuthorization,userController.delete_user)

//get user

router.get('/find/:id',verifyTokenandAdmin,userController.get_user)



//get all users

router.get('/getusers',verifyTokenandAdmin,userController.all_user)



//get user stats


router.get('/stats',verifyTokenandAdmin,userController.user_stat)


module.exports=router