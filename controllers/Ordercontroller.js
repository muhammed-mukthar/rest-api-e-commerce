const Order = require('../models/Order')

//create order

const create_order=async(req,res)=>{
    const newOrder=new Order(req.body)
    try{
       let savedOrder=await newOrder.save()
       res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }

}

//update order

const update_order=async(req,res)=>{
    try{

    const    updateOrder=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        },{new:true});
        res.status(200).json(updateOrder)

    }catch(err){
        res.status(500).json(err)

    }

}

//delete order

const delete_Order=async(req,res)=>{
    try{
        const deleteuser=await Order.findByIdAndDelete(req.params.id)
        if(deleteuser){
            res.status(200).json("Order has been deleted"+deleteuser)

        }else{
            res.status(500).json('some error occured while deleting ')
        }
    }catch(err){
        res.status(500).json('error occured while deleting')
    }

}

//get user order

const get_order=async(req,res)=>{

    try{
   let  Orders= await Order.find({userId:req.params.userId})
   if(Orders){
      


       res.status(200).json(Orders)
   }else{
    res.status(500).json('there is error')
   }
    
        
    }catch(err){
        res.status(500).json('error has occured')
    }
}

//get all orders

const all_order=async(req,res)=>{

    try{
        const Orders=await Order.find()
        res.send(200).json(Orders)

    }catch(err){
        res.status(500).json(err)
    }
}

const order_stat=async (req,res)=>{
    const date=new Date();
    const lastMonth= new Date(date.setMonth(date.getMonth()-1))
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income =await Order.aggregate([{
            $match:{createdAt:{$gte:previousMonth}}
        },{
    
        $project:{
            month:{$month:"$createdAt"},
            sales:"$amount",
        },
        },
        

        {
            $group:{
                _id:"$month",
                total:{$sum:"$sales"},
            }
                }
    ])
    res.status(200).json(income)
        

    }catch(err){
        res.status(500).json(err+"stat  not generated")
    }
}


module.exports={create_order,update_order,delete_Order,get_order,all_order,order_stat}