import { model, Schema, Types } from "mongoose";

const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,

    },
    usedBy:[{
           type:Types.ObjectId,
           ref:'User',  
    }],
    expiredDate:{
        type:Date,
        required:true
    }
},{timestamps:true});
const CouponModel = model('coupon',couponSchema);
export default  CouponModel;