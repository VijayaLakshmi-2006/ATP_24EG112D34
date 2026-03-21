
// import express module to create HTTP server
import exp from 'express';

// import connect function from mongoose to connect MongoDB
import { connect } from 'mongoose';

// import user router
import { userApp } from './APIs/UserAPI.js'

// import product router
import { productAPP } from "./APIs/ProductAPI.js";

// import cookie-parser middleware to read cookies
import cookieParser from 'cookie-parser';


// create express application (this is our HTTP server)
const app = exp();


//  MIDDLEWARES 

// body parser middleware
// converts JSON request body into JavaScript object
app.use(exp.json())

// cookie middleware
// allows server to read cookies sent by browser
app.use(cookieParser())


//  ROUTERS 

// attach product router to server
// any request starting with /product-api goes to productAPP
app.use("/product-api", productAPP);

// attach user router to server
// any request starting with /user-api goes to userApp
app.use('/user-api', userApp)


//DATABASE CONNECTION 

// async function to connect MongoDB
async function connectDB(){
    try{

        // connect to MongoDB database named "userdb"
        await connect("mongodb://localhost:27017/userdb")

        // message if connection successful
        console.log("DB connection successful")

        // server port number
        let port = 4000

        // start HTTP server after database connection
        app.listen(port, () => console.log("Server running on port 4000"))

    }
    catch(err){

        // print error if database connection fails
        console.log(err)

    }
}
// call the function to connect database
connectDB();


// //error handling middleware
// app.use((err,req,res,next)=>{
//     console.log(err.name)
//     //Validation error
//     if(err.name==="ValidationError"){
//     return res.status(400).json({message:"Error occured",error:err.message})
//     }
//     //cast error -Occurs when we delete digit or alpha in object id
//      if(err.name==="CastError"){
//     return res.status(400).json({message:"Error occured",error:err.message})
//     }
// // send server side error
// res.status(500).json({message:"Error occured",error:"Server side error"})
// })


