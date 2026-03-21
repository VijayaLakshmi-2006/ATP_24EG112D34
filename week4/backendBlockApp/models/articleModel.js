import {Schema,model,Types} from 'mongoose'

//creating comment schema
const commentSchema=new Schema({
      user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"User ID required"],
        comment:{
            type:String
        }
      }
})

const articleSchema=new Schema({
    author:{
        type:Types.ObjectId,  //{_id:ObjectId("avgfxhcncbcgv")}
        ref:"user",
        required:[true,"AuthorId is required"]                     //{key:value(ObjectId of string)}
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
    type:String,
    required:[true,"Category is required"]
    },
    content:{
        type:String,
         required:[true,"Content is required"]
    },
   // comments:[ type:commentSchema, default:[]],          //{comment:"",user:"" =>pass another schema in array}
                          //find().populate("cart.product","projected attributes")
    isArticleActive:{
        type:Boolean,
        default:true
    }
},
    {
    versionKey:false,
    timestamps:true,
    strict:"throw"
})


//create article model
export const articleModel=model("article",articleSchema)