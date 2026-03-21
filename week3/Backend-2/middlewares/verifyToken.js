import jwt from 'jsonwebtoken'
const {token}=jwt

export function verifyToken(req,res,next){
    //token verification logic
    const token=req.cookies ?.token
    //if req from unauthorized user
    if(!token){
        return res.status(401).json({message:"Plz login"})
    }
   try{
    //if token is existed
    const decodedToken=verify(token,'abcdef')
    console.log(decodedToken)
    next();
} 
catch(err){
     res.status(401).json({message:"session expired.please re-login"})
   }
}