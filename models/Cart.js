const mongoose=require('mongoose')

const CartSchema=new mongoose.Schema({
    userId:{type:"String",required:true},
    products:[
        {
            ProductId:{type:String,required:true},
            quantity:{
                type:Number,
               default:1,
            }
        }
    ]

})

module.exports=mongoose.model("Cart",CartSchema)