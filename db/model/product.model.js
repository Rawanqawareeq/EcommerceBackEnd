import { model, Schema, Types } from "mongoose";

const productshcema = new Schema({
name:{
    type:String,
    unique:true,
    required:true
},
Slug:{
    type:String,
    required:true,
},
stock:{
    type:Number,
    default:1
},
description:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
discount:{
    type:Number,
    default:0,
},
finalPrice:{
    type:Number,
    required:true,
},
mainImage:{
    type:Object,
    required:true,
},
subImage:[{
    type:Object,
}],
status:{
    type:String,
    default:'Active',
    enum:['Active','NotActive']
},
sized:[{
  type:String,
  enum:['s','m','l','xl'],
  
}],
colors:[String],
createdBy:{
    type:Types.ObjectId,
    ref:'User',
},
categoryId:{
    type:Types.ObjectId,
    ref:'Category',
    required:true,
},
subcategoryId:{
    type:Types.ObjectId,
    ref:'SubCategory',
    required:true,
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
}

},{timestamps:true,});
const ProductModel = model('Product',productshcema);
export default ProductModel;