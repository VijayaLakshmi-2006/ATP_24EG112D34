import {Schema,model} from 'mongoose'
const productSchema=new Schema({
productId:{
        type:Number,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    brand:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:[true,"Price is required"]
    }
})
export const productModel=model("product",productSchema)