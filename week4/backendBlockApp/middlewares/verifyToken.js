
import jwt from 'jsonwebtoken'
import { config} from 'dotenv'
const {verify}=jwt
config();

export const verifyToken=async(...allowedRoles)=>{
    return (req,res,next)=>{
  try{  //get token from cookie
    const token=req.cookies?.token// {token:asdaad}
    //check token existed or not
    if(!token){
        return res.status(401).json({message:"please login first"})
    }
    //validate token(decode the token)
    let decodedToken=verify(token,process.env.SECRET_KEY);
    //check the same role is same in decoded token
    if(!allowedRoles.includes(decodedToken.role))
    {
        return res.status(403).json({message:"you are not authorised"});
    }
    //add decoded token
    res.user=decodedToken;
    next()
  }
   catch(err){
    res.status(401).json({message:"Invalid token"})
    }
}
}


//Read own articles
