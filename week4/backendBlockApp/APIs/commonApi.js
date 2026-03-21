import exp from 'express';
import { userModel } from '../models/userModel.js';
import {hash} from 'bcryptjs'
export const commonApp=exp.Router();
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/VerifyToken.js';
const {sign}=jwt

//route for register
commonApp.post("/users",async(req,res)=>{
let allowedRoles=['USER','AUTHOR']
//get user from req
const newUser=req.body
//check role
if(!allowedRoles.includes(newUser.role)){
  return res.status(400).json({message:"Invalid User"})
}
//hash password and replace plain with hashed one
newUser.password=await hash(newUser.password,12)
//create New user doc
const newUserDoc=new userModel(newUser)
//save doc
await newUserDoc.save()
//send res  (403-user is authenticated but not authorized)
res.status(201).json({message:"User Created"})
})

//route for login
commonApp.post("/login",async(req,res)=>{
  //get user cred obj
  const {email,password}=req.body
  //find user by email
    const user=await userModel.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"Invalid email"})
    }
    //compare password
    const isMatch = await compare(password,user.password)
  if(!isMatch){
    return res.status(400).json({message:"Invalid password"})
  }
 //create jwt
const signedToken=sign({id:user_id,email:email,role:user.role},process.env.SECRET_KEY,{expiresIn:"1h"})

    //set token to cookie header as httpOnly cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    //remove password from user document
    let userObj=user.toObject();
    delete 
    //send res
    res.status(200).json({message:"login success",payload:user})
})
//route for logout 
commonApp.get("/logout",(req,res)=>{
  //delete the token from cookie storage
  res.clearCookie("token",{
    httpOnly:true,
    secure:false,
    sameSite:"lax"
  })
  //send res
  return res.status(200).json({message:"Logout successful"})
})

//change password
commonApp.put("/password",verifyToken("USER",'AUTHOR,"ADMIN'),async(req,res)=>{
  //check current pass and new pass are same
  //get current pass of user/admin/author
  try{
  const newPassword=req.body
  const user=await userModel.findOne({password:newPassword})
  newPassword.password=await hash(newPassword.password,12)
  //check curr pass of req and user are not same
  const newUserDoc=new userModel(newPassword)
  //hash new pass
  if(user!==newUserDoc){
   
  }
  //replace curr pass of user with hashed pass
  //save6w
}
await newUserDoc.save()
//send res
res.status(201).json({message:"Password updated"})
})