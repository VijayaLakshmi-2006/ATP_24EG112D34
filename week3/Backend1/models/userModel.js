// Server restart -> users array becomes empty, So we use MongoDB database to store data permanently.

//importing packages
import {Schema,model} from 'mongoose'
//Create user schema 
const userSchema=new Schema({                     // {new-Operator}
    //Structure of User Resource
    UserName:{
        type:String,
        required:[true,"UserName is required"],
        minLength:[10,"Min length of username is 10 chars"],
        maxLength:[15,"Max length exceeds the length"]
    },
    Password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    Email:{
        type:String,
        required:[true,"Email is required"]
    },
    Age:{
        type:Number   //{Age is number so datatype is Num, required fiels is not there so it is optional to fill by user/client}
    }
});      
//Generate UserModel
export const UserModel=model("user",userSchema)
//We cannot create the model before the schema because the model depends on the schema definition.
// user (TO users)-Mongoose converts it to lowercase plural.