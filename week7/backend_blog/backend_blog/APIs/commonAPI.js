import exp from 'express'
import { UserModel } from '../models/userModel.js'
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'
import { upload } from '../config/multer.js'
const { sign } = jwt
export const commonApp = exp.Router()
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'



//in express no need try catch it handles error automatically
let allowedRoles = ["USER", "AUTHOR"]
//route for register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res) => {
    //get user from req
    const newUser = req.body

    // add profileImageUrl if file is uploaded
    if (req.file) {
        newUser.profileImageUrl = req.file.path;
    }
    //check role
    if (!newUser.role || !allowedRoles.includes(newUser.role.toUpperCase())) {
        return res.status(400).json({ message: "Invalid role" })
    }
    //check if user already exists
    const existingUser = await UserModel.findOne({ email: newUser.email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }
    let cloudinaryReslt;
//upload image to cloudinary from memory storage
if(req.file){
    cloudinaryReslt = await uploadToCloudinary(req.file.buffer)
}
//add CDN link to the user obj
if(cloudinaryReslt){
    newUser.profileImageUrl = cloudinaryReslt.secure_url
}
    //run validation password it should not be empty 
    
    //hash password and replaace it with plain password
    newUser.password = await hash(newUser.password, 12)
    //normalize role to uppercase
    newUser.role = newUser.role.toUpperCase()
    const newUserDoc = new UserModel(newUser)
    //save user
    await newUserDoc.save()
    //resend res 
    res.status(201).json({ message: "User registered successfully" })

})


// route for login
commonApp.post("/login", async (req, res) => {
    //get user cred obj
    const { email, password } = req.body
    //find user bt email
    const user = await UserModel.findOne({ email: email })
    //if user not found
    if (!user) {
        return res.status(401).json({ message: "Invalid email" })
    }
    if (user.isUserActive === false) {
        return res.status(403).json({ message: "Your account has been blocked by the admin." })
    }
    //compare password
    const isMatched = await compare(password, user.password)
    if (!isMatched) {
        return res.status(401).json({ message: "Invalid password" })
    }


    //create jwt
    const signedToken = sign({id:user._id, email: email, role: user.role,firstName:user.firstName,lastName:user.lastName,profileImg:user.profileImg}, process.env.SECRET_KEY,{expiresIn:"1H"})

    //set token in cookie
    res.cookie("token", signedToken, { httpOnly: true, secure: false, sameSite: "lax",maxAge:60*60*1000 })

    //remove password from user obj
    let userObj = user.toObject()
    delete userObj.password


    //send 
    res.status(200).json({ message: "login successfull", payload: userObj, user: userObj })
})

//route for logout
commonApp.get("/logout", async (req, res) => {
    
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" })
    res.status(200).json({ message: "logout successfull" })

})
//page refresh check
commonApp.get("/check-auth",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    res.status(200).json({message:"authenticated",payload:req.user})
})
//change password
commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    const {currentPassword,newPassword}=req.body
    const user = await UserModel.findById(req.user?.id)
    if(user.password !== await hash(currentPassword,12)){
        return res.status(401).json({message:"Invalid current password"})
    }
    user.password = await hash(newPassword,12)
    await user.save()
    res.status(200).json({message:"Password changed successfully",payload:user})
})