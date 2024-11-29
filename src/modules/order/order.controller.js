import 'dotenv/config'
import CartModel from "../../../db/model/cart.model.js"
import CouponModel from "../../../db/model/coupon.model.js";
import OrderModel from "../../../db/model/order.model.js";
import ProductModel from "../../../db/model/product.model.js";
import UserModel from "../../../db/model/user.model.js";
import Stripe from 'stripe';
import createInvoice from "../../utls/pdf.js";


const stripe = new Stripe(process.env.STRIP);

export const create =async(req,res)=>{
    const cart = await CartModel.findOne({userId:req.user._id});
    const {couponName} = req.body;   
    if(!cart || cart.products.length === 0){
        return  res.status(404).json({message:"cart is empty"});
    }
    if(couponName){
        const coupon = await CouponModel.findOne({name:req.body.couponName});
        if(!coupon){
            res.status(404).json({message:"coupon not found"});
        }
        if(coupon.expiredDate < new Date()){
            res.status(404).json({message:"coupon expired"});
        }
       
        if(coupon.usedBy.includes(req.user._id)){
            res.status(404).json({message:"coupon already used"});
        }     
        req.body.coupon=coupon;
    }
    req.body.products = cart.products;
    let finalProductList =[];
    let subtotal = 0;
    for(let product of req.body.products){
        const checkProduct = await ProductModel.findOne({_id:product.productId,stock:{$gte:product.quantity}});
        if(!checkProduct){
            res.status(404).json({message:"product quantity not avaliable"});
        }
        product = product.toObject();
        product.productName = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice = checkProduct.price * product.quantity;
        subtotal += product.finalPrice;
        finalProductList.push(product);
    }
    const user = await UserModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.PhoneNumber){
        req.body.PhoneNumber = user.phone;
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price_data: {currency: 'USD',
              unit_amount:(subtotal - (subtotal * ((req.body.coupon?.ammount || 0))/100)),
               product_data:{
                   name:user.userName,
               }
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `https://www.facebook.com`,
          cancel_url: `https://www.youtube.com`,
    });
    const Order = await OrderModel.create({
        userId:req.user._id,
        products:finalProductList,
        finalPrice:(subtotal - (subtotal * ((req.body.coupon?.ammount || 0))/100)),
        address:req.body.address,
        PhoneNumber:req.body.PhoneNumber,
        UpdatedBy:req.user._id,
    });


    if(Order){

const invoice = {
  shipping: {
    name: user.userName,
    address: Order.address,
    phoneNumber: Order.PhoneNumber,
  },
  items: Order.products,
  subtotal: Order.finalPrice,
  paid: 0,
  invoice_nr: Order._id
};

createInvoice(invoice, "invoice.pdf");
        for(let product of req.body.products){
            await ProductModel.findOneAndUpdate({_id:product.productId},{
               $inc:{stock:-product.quantity} }
            );
        }
        if(req.body.coupon){
          const i =   await CouponModel.findOneAndUpdate({_id:req.body.coupon._id},{
            $addToSet:{usedBy:req.user._id}
          });

        }
        

        await CartModel.updateOne({userId:req.user._id},{products:[]});
    }
    return res.status(200).json({message:"success",Order,session});


}
export const getall = async(req,res)=>{
    const order = await OrderModel.find().populate({
       path:'userId',
       select:'userName'
    });
    return res.status(200).json({message:"success",order});
}
export const get = async(req,res)=>{
    const order = await OrderModel.findOne({userId:req.user._id,
           $or:[{
              status:"pending",
           },
           {
            status:"confirmed",
         },
         {
            status:"onway",
         },
         {
            status:"delivered",
         }
        ]
        });
    return res.status(200).json({message:"success",order});
}
export const changeStatus = async(req,res)=>{
    const{orderId} = req.params;

    const order = await OrderModel.findById(orderId);
    if(!order){
        return res.status(404).json({message:"order not found",order});
    }
    order.status = req.body.status ;
    order.save();
    return res.status(200).json({message:"success",order});
}