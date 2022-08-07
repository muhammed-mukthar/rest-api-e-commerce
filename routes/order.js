const Order = require('../models/Order')
const OrderController=require('../controllers/Ordercontroller')
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require('./verifytoken')

const router=require('express').Router()

//create

router.post('/',verifyToken,OrderController.create_order)


//update
router.put("/:id",verifyTokenandAdmin,OrderController.update_order)


// //delete

router.delete('/:id',verifyTokenandAdmin,OrderController.delete_Order)

// // //get user orders

router.get('/find/:userId',verifyTokenandAuthorization,OrderController.get_order)


// //get all 

router.get('/',verifyTokenandAdmin,OrderController.all_order)


//get monthly income

router.get('/income',verifyTokenandAdmin,OrderController.order_stat)



module.exports=router