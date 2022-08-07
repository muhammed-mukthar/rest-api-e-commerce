const express=require('express')
const app=express();
const mongoose =require('mongoose')
const dotenv=require('dotenv')
const userroute=require('./routes/user')
const productroute=require('./routes/product')
const cartroute=require('./routes/cart')
const authroute=require('./routes/auth')
const orderroute=require('./routes/order')
const striperoute=require('./routes/stripe')
const cors=require("cors")

dotenv.config()//env config
mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log('db connection is succesffull'))
    .catch((err)=>console.log(err)
)

app.use(express.json())
app.use(cors())
app.use('/api/users',userroute)
app.use('/api/auth',authroute)
app.use('/api/products',productroute)
app.use('/api/carts',cartroute)
app.use('/api/orders',orderroute)
app.use('/api/payment',striperoute)
app.get('/api/test',()=>{
    console.log('test is succesfull');
})



app.listen(process.env.PORT||5000,()=>console.log('server is running on localhost5000'))