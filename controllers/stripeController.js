const stripe=require('stripe')(process.env.STRIPE_KEY)

const create_payment=async(req,res)=>{
   await stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:'usd'
    },(stripeerror,striperes)=>{
        if(stripeerror){
            res.status(500).json(stripeerror)
        }else{
            res.status(200).json(striperes)
        }
    })
}
module.exports={create_payment}