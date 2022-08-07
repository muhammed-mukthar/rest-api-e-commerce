const User = require('../models/User')



//user update
const user_Update=async(req,res)=>{
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
}


const all_user=async(req,res)=>{
    const query=req.query.new
    try{
        const users= query?await User.find().sort({_id:-1}).limit(5): await User.find()
        res.status(200).json(users)

    }catch(err){
        res.status(500).json('error has occured while getting user')
    }

}

//delete
const delete_user=async(req,res)=>{
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

}
//get specific user

const get_user=async(req,res)=>{

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
}
//user stats

const user_stat=async(req,res)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1))

try{
    const data=await User.aggregate([
        {$match:{createdAt:{$gte:lastYear}}},
        {$project:{
        month:{$month:"$createdAt"}
    },},{
        $group:{
            _id:"$month",
            total:{$sum:1},

        },
    },
])
    res.status(200).json(data)
}catch(err){
    res.status(500).json("there is a error")
}

}

module.exports={user_Update,all_user,delete_user,get_user,user_stat}