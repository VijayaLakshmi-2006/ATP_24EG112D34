//create min-express app(Separate user)
import exp from 'express'
import { UserModel } from '../models/userModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'  //default export are there
import { verifyToken } from '../middlewares/verifyToken.js'
const {sign}=jwt   //sign=encode
export const userApp=exp.Router()


userApp.use(exp.json()) 

//DEFINE USERR REST API ROUTES
  //Create new user
  userApp.post('/users',async(req,res)=>{
    //to get new user obj from req
    const newUser=req.body
    //hash the password  (For hashing - module(bcryptjs))
    const hashedPassword = await hash(newUser.password,10)
    //replace plain password with hashed password
    newUser.password = hashedPassword
    //create new user document
    const newUserDocument=new UserModel(newUser)
    //Save
    const result=await newUserDocument.save()
    console.log("result:",result)
    //send response to the client
    res.status(201).json({message:"User Created"})
  })

  //Read all users(making this as a protected route) --->(Verify Token added ,now this route is protected)
  userApp.get('/users',verifyToken,async(req,res)=>{
    //read all users from db
    let usersList=await UserModel.find()
    res.status(200).json({message:"users",payload:usersList})
  })

  //Read a user by object id
  userApp.get("/user",verifyToken,async(req,res)=>{
    let productId=req.params.pid;
    //read user email from req
    const emailOfUser=req.user?.email;
    
    //read obj id from req
    //const uid=req.params.id
    //find user by id
   //const userObj = await UserModel.findOne({_id: uid})    //{findById()}- Is used to search doc by id(just pass id(uid))

   const userObj = await UserModel.findOne({email:emailOfUser})
      if(!userObj){
                return res.status(404).json({message:"User not found"})
     } 
   
    //send res
    res.status(200).json({message:"user",payload:userObj})
  })
//Use findOne() to read a document with non object id fields
//Use findById() to read document with object id

//update a user by id
userApp.put("/users/:id",async(req,res)=>{
    //get modified user from req
    const modifiedUser=req.body
    const uid=req.params.id
    //find user by id & update
    const updatedUser=await UserModel.findByIdAndUpdate(uid,{$set:{...modifiedUser}},{new:true,runValidators:true})   //{new:true}=> gives the another new documented after modifying
    //send res
    res.status(200).json({message:"User Modified",payload:updatedUser})
})

//Delete a user by id
userApp.delete('/users/:id',async(req,res)=>{
  //get id from req params
     const uid=req.params.id
     const deletedUser=await UserModel.findByIdAndDelete(uid)
     //send res
     if(!deletedUser){
        return res.status(404).json({message:"User not found"})
     }
      res.status(200).json({message:"User Deleted",payload:deletedUser})
})

let user = await UserModel.findOne({email:email})
//authentucation
userApp.post('/auth',async(req,res)=>{
  //get user cred obj from client
  const {email,password}=req.body;
  //verify email
  let user=await UserModelfindOne({email:email})
  //if email not existed
  if(user===null)
  {
    return res.status(404).json({message:"Invalid email"})
  }
  //compare the password
    let result=await compare(password,user.password)
    //if passwords not matched
    if(result===false){
      return res.status(400).json({message:"Invalid password"})
    }
    //if passwords are matched
    //create a jwt token
    const signedToken=sign({email:user.email},"abcdef",{expiresIn:100})
//store token in httponlycookie
res.cookie("token",signedToken,{
  httpOnly:true,
  sameSite:"lax",
  secure:false
})
    //send token in res
    res.status(200).json({message:"login success",token:signedToken})
})


//add product to the cart
userApp.put("cart/product-id/:pid",async(req,res)=>{
  //get product ID fro url pattern
  let productId=req.params.id;
  //get current user details
  const emailofUser=req.user?.email
  //add product to cart
  // result=await UserModel.findOneAndUpdate({email:emailofUser},{$push:{cart:{product:productId}}})
 result=await UserModel.findOne({email:emailofUser}).populate("cart.product")
  //console.log(result);
  //if user is invalid
  if(!result)
  {
    return res.status(404).json({message:"user not found"})
  }
  res.status(200);json({message:"product added to cart"})
})

 //Read a user by object id and count
  userApp.get("/user",verifyToken,async(req,res)=>{
    //let product id from url param
     let productId=req.params.pid;
    //read user email from req
    const emailOfUser=req.user?.email;
    //add product to the cart
      let count=1
    //before adding,first it shoukd check that product already in the cart
    const userObj = await UserModel.findOne({email:emailOfUser})
      if(!userObj){
            return  res.status(200).json({message:"user",payload:userObj})    
      }
                else{
               count++
                return  res.status(200).json({message:"user",payload:userObj})
                }
    //if product there then increment count by 1,otherwise add product to the cart

     
    //read obj id from req
    //const uid=req.params.id
    //find user by id
   //const userObj = await UserModel.findOne({_id: uid})    //{findById()}- Is used to search doc by id(just pass id(uid))

    
   
    //send res
  
  })



  