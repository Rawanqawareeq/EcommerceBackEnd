import { type } from "express/lib/response.js";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        min:4,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    states:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin','SuperAdmin']

    }
},{
    timestamps:true,
});
const UserModel = model('User',userSchema);
export default UserModel;