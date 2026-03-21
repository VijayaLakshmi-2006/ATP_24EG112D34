import {Schema,model,Types} from 'mongoose'

//cart schema is not product it have properities
//create cart schema
const cartSchema=new Schema({
    productName:{
        type:Types.ObjectId,
        ref:"product"  //name of the product model
    },
    count:{
     type:Number,
     default:1
    }
})

//Create user schema 
const userSchema=new Schema({                     // {new-Operator}
    //Structure of User Resource
    UserName:{
        type:String,
        required:[true,"UserName is required"],
        minLength:[3,"Min length of username is 3 chars"],
        maxLength:[6,"Max length exceeds the length"]
    },
    Password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    Email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already existed"]
    },
    Age:{
        type:Number   //{Age is number so datatype is Num, required fiels is not there so it is optional to fill by user/client}
    },
    cart:[cartSchema],  //it accepts ele which aere cartSchema object type
},
{
    versionKey:false,
    timestamps:true
});      
//Generate UserModel
export const UserModel=model("user",userSchema)
//user=> pural(users) and create collection on users