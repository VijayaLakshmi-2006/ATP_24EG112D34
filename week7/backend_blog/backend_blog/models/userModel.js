//
import {Schema,model} from "mongoose"

const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'First name is required']
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    //can also use regular expressions
    password:{
       type:String,
       required:[true,'Password is required'],
       minlength:8
    },
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,'Invalid role']
    },
    profileImageUrl:{
       type:String
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
})

export const UserModel = model("user",userSchema)