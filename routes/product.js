const Product = require('../models/Product')
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require('./verifytoken')
const productController=require('../controllers/productController')
const router=require('express').Router()

//create

router.post('/',verifyTokenandAdmin,productController.create_product)


//update
router.put("/:id",verifyTokenandAdmin,productController.update_product)


// //delete

router.delete('/:id',verifyTokenandAdmin,productController.delete_product)

// //get product

router.get('/find/:id',productController.get_product)


//get all products

router.get('/',productController.all_product)


module.exports=router