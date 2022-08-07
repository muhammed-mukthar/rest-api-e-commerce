const Product = require('../models/Product')


//create product

const create_product=async(req,res)=>{
    const newProduct=new Product(req.body)
    try{
       let savedproducts=await newProduct.save()
       res.status(200).json(savedproducts)
    }catch(err){
        res.status(500).json(err)
    }

}

//update product

const update_product=async(req,res)=>{
    try{

        updateProduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        },{new:true});
        res.status(200).json(updateProduct)

    }catch(err){
        res.status(500).json(err)

    }

}

//delete product

const delete_product=async(req,res)=>{
    try{
        const deleteuser=await Product.findByIdAndDelete(req.params.id)
        if(deleteuser){
            res.status(200).json("product has been deleted"+deleteuser)

        }else{
            res.status(500).json('some error occured while deleting ')
        }
    }catch(err){
        res.status(500).json('error occured while deleting')
    }

}

//get product

const get_product=async(req,res)=>{

    try{
   let  Productget= await Product.findById(req.params.id)
   if(Productget){
      


       res.status(200).json({Productget})
   }else{
    res.status(500).json('there is error')
   }
    
        
    }catch(err){
        res.status(500).json('error has occured')
    }
}


//all product

const all_product=async(req,res)=>{
    const qnew=req.query.new
    const qcategory=req.query.category
    try{
        let products;
        if(qnew){
            products=await Product.find().sort({createdAt:-1}).limit(1)
        }else if(qcategory){
            products=await Product.find({categories:{
                $in:[qcategory]
            }})

        }else{
            products=await Product.find()
        }
       
        res.status(200).json(products)

    }catch(err){
        res.status(500).json('error has occured while getting product')
    }

}
module.exports={create_product,update_product,delete_product,get_product,all_product}