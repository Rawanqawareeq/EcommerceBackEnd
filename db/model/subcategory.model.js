import mongoose, { model, Schema,Types } from "mongoose";
const SubCategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
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
const SubcategoryModel =  model('SubCategory',SubCategorySchema);
export default SubcategoryModel;
