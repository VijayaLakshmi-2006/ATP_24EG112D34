//create HTTP server
import exp from 'express'
const app=exp();
import {userApp} from "./APIs/userAPI.js";
import {productApp} from "./APIs/productAPI.js";

// app is special name which holds express application
//express application internally contains HTTP server

//json()-built-in middleware function(body parse middle ware), app.use() to apply this middleware to incoming requests.
app.use(exp.json())  // if not adding this the req of obj is always un defined
// If we do NOT write this: req.body will be undefined ,Server cannot read the data sent by user 

//creaate custom middleware
function middleware1(req,res,next){
    console.log("msg from middleware1")
    //send response from middleware
//res.json({message:"This msg from middleware1"})
//using next() it assigns that job to next middleware or (if middleware no there) it goes to rout
next() 
}
function middleware2(req,res,next){
    console.log("msg from middleware2")
    //send response from middleware
//res.json({message:"This msg from middleware2"})

//using next() it assigns that job to next middleware or (if middleware no there) it goes to rout
next() 
}
app.use(middleware1)
app.use(middleware2)
//forward req to userAPI if path starts with /user-api
app.use('/user-api',userApp)
//forward req to productAPI if path starts with /product-api
app.use('/product-api',productApp)
const port=3000
//creating own server no need to use apache tomcat like that
//assign port number to http server
app.listen(port,()=>console.log(`Server listening on port ${port}...`))