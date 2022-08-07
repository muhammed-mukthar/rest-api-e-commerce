const router=require('express').Router()
const User=require('../models/User')
const  Cryptojs=require('crypto-js');
const { json } = require('express');
const jwt=require('jsonwebtoken')
//register
router.post('/register',async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        password:Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        email:req.body.email,
    })
    try{
       const savedUser   = await newUser.save()
       res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err);
    }

});

//Login
router.post('/login', async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
   
        !user&& res.status(401).json("wrong credentials")
        const hashedPassword=Cryptojs.AES.decrypt(

            user.password,process.env.PASS_SEC 
            );
      const  Originalpassword=hashedPassword.toString(Cryptojs.enc.Utf8)
        Originalpassword != req.body.password && 
        res.status(401).json("wrong credentials!")
            //setting jwt token
            console.log(user);
        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SEC,{expiresIn:"3d"}
        );


        const {password,...others}=user._doc//mongo db stores it file in _doc so we use ._doc


        res.status(200).json({...others,accessToken})
    }catch(err){
        res.status(500),json(err)
    }

})


module.exports=router