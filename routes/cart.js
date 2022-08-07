const Cart = require('../models/Cart')
const CartController=require('../controllers/CartController')
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require('./verifytoken')

const router=require('express').Router()

//create

router.post('/',verifyToken,CartController.create_cart)

//update

router.put("/:id",verifyTokenandAuthorization,CartController.updateCart)


// //delete

router.delete('/:id',verifyTokenandAdmin,CartController.delet_Cart)

// // //get cart

router.get('/find/:userId',verifyTokenandAuthorization,CartController.get_cart)

// //get all 

router.get('/',verifyTokenandAdmin,CartController.all_cart)



module.exports=router