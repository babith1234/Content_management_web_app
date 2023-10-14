const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv=require('dotenv')  

dotenv.config()   

const port = process.env.PORT

const app=express()

app.use(express.json())     

app.use(cors())  


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})


app.listen(port, ()=>{
    console.log(`server running at ${port}`);
})

