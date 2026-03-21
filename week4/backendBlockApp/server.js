
//import express module to create server
import exp from 'express';

//import dotenv to read environment variables from .env file
import { config } from 'dotenv'

//import mongoose to connect Node.js with MongoDB database
import mongoose from 'mongoose';
import {userApp} from  './APIs/userApi.js'
import {authorApp} from  './APIs/authorAPI.js'
import {adminApp} from   './APIs/adminAPI.js'
import {commonApp} from   './APIs/commonApi.js'

//load environment variables (.env file)
config()

//create express application (HTTP server)
const app = exp();

app.use(exp.json())
//path level middlewares
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api', adminApp)
app.use('/auth',commonApp)
//assign port 
//if PORT is available in .env use it, otherwise use 5000
const port = process.env.PORT || 5000;


//connect to DB
//async function is used because database connection takes time
const connectDB = async () => {
    try {
        //connect to MongoDB using URL from .env file
        await mongoose.connect(process.env.MONGO_URL);

        //message if connection is successful
        console.log("MONGO DB Connected successfully")

        //start server and listen on given port
        app.listen(port, () => console.log(`server running on port ${port}`));

    } catch (error) {

        //if any error occurs during DB connection
        console.log("err in db connection", error);
    }
}

//call the function to connect database
connectDB()



//Global Error Handling Middleware
//this middleware catches errors from routes and database operations
app.use((err,req,res,next)=>{

    //print error stack in console
    console.error(err.stack);

    //check if mongoose validation error
    if(err.name==="ValidationError"){
        return res.status(400).json({
            message:"Validation failed",
            error:err.message
        })
    }

    //check if mongoose cast error (invalid id etc.)
    if(err.name==="CastError"){
        return res.status(400).json({
            message:"Invalid input",
            error:err.message
        })
    }

    //default server error
    res.status(500).json({
        message:"Something went wrong!",
        error:err.message
    })
})