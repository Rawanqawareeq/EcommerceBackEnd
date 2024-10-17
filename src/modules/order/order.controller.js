import CartModel from "../../../db/model/cart.model.js"
import CouponModel from "../../../db/model/coupon.model.js";
import OrderModel from "../../../db/model/order.model.js";
import ProductModel from "../../../db/model/product.model.js";
import UserModel from "../../../db/model/user.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Q9tR0DPF661wwvGjLGgSnRrWpugM7WjYfHAki4aUtwY3OVuwvCa1R07nnjhxihjLi8NRgmCu6TIMhHmTw8ElO8J00nvpFx6c9');

export const create =async(req,res)=>{
    const cart = await CartModel.findOne({userId:req.user._id});
    const {couponName} = req.body;   
    if(!cart || cart.products.length === 0){

        return  res.status(404).json({message:"cart is empty"});
    }
    if(couponName){
        const coupon = await CouponModel.findOne({name:req.body.couponName});
        if(!coupon){
            return next(new AppError("coupon not found",404));
        }
        if(coupon.expiredDate < new Date()){
            return next(new AppError("coupon expired",404));
        }
       
        if(coupon.usedBy.includes(req.user._id)){
            return next(new AppError("coupon already used",404));
        }     
        req.body.coupon=coupon;
    }

    req.body.products = cart.products;

    let finalProductList =[];
    let subtotal = 0;
    for(let product of req.body.products){
        const checkProduct = await ProductModel.findOne({_id:product.productId,stock:{$gte:product.quantity}});
        if(!checkProduct){
            return next(new AppError("product quantity not avaliable",400));
        }

        product = product.toObject();
        product.name = checkProduct.name;
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
    return res.json({massege:"success",Order});


}
export const getall = async(req,res)=>{
    const order = await OrderModel.find().populate({
       path:'userId',
       select:'userName'
    });
    return res.json({massege:"success",order});
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
    return res.json({order});
}
export const changeStatus = async(req,res)=>{
    const{orderId} = req.params;

    const order = await OrderModel.findById(orderId);
    if(!order){
        return next(new AppError("order not found",404));
    }
    order.status = req.body.status ;
    order.save();
    return res.json({message:"success",order});
}