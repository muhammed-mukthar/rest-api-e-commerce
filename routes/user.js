const User = require('../models/User')
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require('./verifytoken')

const router=require('express').Router()

router.put("/:id",verifyTokenandAuthorization,async(req,res)=>{
        if(req.body.password){
            req.body.password=CryptoJS.AES.encrypt(
                req.body.password,process.env.PASS_SEC
            ).toString();
        }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true}
            )
            console.log(req.params.id);
            res.status(200).json(updatedUser)

           
        }catch(err){
            res.status(500).json(err)

            
        }
        
                
    })

//delete

router.delete('/:id',verifyTokenandAuthorization,async(req,res)=>{
    try{
        const deleteuser=await User.findByIdAndDelete(req.params.id)
        if(deleteuser){
            res.status(200).json("user has been deleted"+deleteuser)

        }else{
            res.status(500).json('some error occured while deleting ')
        }
    }catch(err){
        res.status(500).json('error occured while deleting')
    }

})

//get user

router.get('/find/:id',verifyTokenandAdmin,async(req,res)=>{

    try{
   let  userget= await User.findById(req.params.id)
   if(userget){
       const {password,...others}=userget._doc//mongo db stores it file in _doc so we use ._doc


       res.status(200).json({...others})
   }else{
    res.status(500).json('there is error')
   }
    
        
    }catch(err){
        res.status(500).json('error has occured')
    }
})
//get all users

router.get('/getusers',verifyTokenandAdmin,async(req,res)=>{
    const query=req.query.new
    try{
        const users= query?await User.find().sort({_id:-1}).limit(5): await User.find()
        res.status(200).json(users)

    }catch(err){
        res.status(500).json('error has occured while getting user')
    }

})

//get user stats

router.get('/stats',verifyTokenandAdmin,async(req,res)=>{
    const date=new Date();
    const lastyear=new Date(date.setFullYear)
})


module.exports=router