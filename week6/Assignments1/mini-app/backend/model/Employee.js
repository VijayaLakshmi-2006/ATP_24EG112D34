import {Schema,model,Types}  from 'mongoose';

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:5,
        maxLength:20
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    designation:{
        type:String,
        required:true
    },
    mobile:{
       type: Number
    },
    companyName:{
      type:String
      
    }
});

export const Employee = model('Employee',EmployeeSchema);