import { status, type } from "express/lib/response.js";
import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,

    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,

    }
});
const CategoryModel = model('Category',categorySchema);
export default CategoryModel;