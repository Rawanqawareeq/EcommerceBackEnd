import { model, Schema, Types } from "mongoose";

const CartSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:'Product',
            required:true,      
        },
        quantity:
        {type:Number,
        default:1,
        }
    }]

},{timestamps:true});
const CartModel = model('Cart',CartSchema);
export default CartModel;