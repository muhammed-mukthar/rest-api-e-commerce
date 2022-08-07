const Cart = require('../models/Cart')

//create cart

const create_cart=async(req,res)=>{
    const newCart=new Cart(req.body)
    try{
       let savedCart=await newCart.save()
       res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }

}
const updateCart=async(req,res)=>{
    try{

    const    updateProduct=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        },{new:true});
        res.status(200).json(updateProduct)

    }catch(err){
        res.status(500).json(err)

    }

}

//delete cart

const delet_Cart=async(req,res)=>{
    try{
        const deleteuser=await Cart.findByIdAndDelete(req.params.id)
        if(deleteuser){
            res.status(200).json("Cart has been deleted"+deleteuser)

        }else{
            res.status(500).json('some error occured while deleting ')
        }
    }catch(err){
        res.status(500).json('error occured while deleting')
    }

}

//get cart

const get_cart=async(req,res)=>{

    try{
   let  cart= await Cart.find({userId:req.params.userId})
   if(Productget){
      


       res.status(200).json(cart)
   }else{
    res.status(500).json('there is error')
   }
    
        
    }catch(err){
        res.status(500).json('error has occured')
    }
}

//all cart

const all_cart=async(req,res)=>{

    try{
        const carts=await Cart.find()
        res.send(200).json(carts)

    }catch(err){
        res.status(500).json(err)
    }
}

module.exports={create_cart,updateCart,delet_Cart,get_cart,all_cart}