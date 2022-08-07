const router=require('express').Router()
const stripeController=require('../controllers/stripeController')


//create payment
router.post('/payment',stripeController.create_payment)


module.exports=router