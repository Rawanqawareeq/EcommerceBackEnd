import CartModel from "../../../db/model/cart.model.js"
import CouponModel from "../../../db/model/coupon.model.js";
import OrderModel from "../../../db/model/order.model.js";
import ProductModel from "../../../db/model/product.model.js";
import UserModel from "../../../db/model/user.model.js";

export const create =async(req,res)=>{
    const cart = await CartModel.findOne({userId:req.user._id});
    const {couponName} = req.body;
    
    if(!cart || cart.products.length === 0){
        return res.status(404).json({massege:"cart is empty"});
    }
    if(couponName){
        const coupon = await CouponModel.findOne({name:req.body.couponName});
      
        if(!coupon){
            return res.status(404).json({massege:"coupon not found"});
        }
        if(coupon.expiredDate < new Date()){
            return res.status(404).json({massege:"coupon expired"});
        }
       
        if(coupon.usedBy.includes(req.user._id)){
            return res.status(404).json({massege:"coupon already used"});

        }   
   
        req.body.coupon=coupon;

    }

    req.body.products = cart.products;

    let finalProductList =[];
    let subtotal = 0;
    for(let product of req.body.products){
        const checkProduct = await ProductModel.findOne({_id:product.productId,stock:{$gte:product.quantity}});
        if(!checkProduct){
            return res.status(400).json({massege:"product quantity not avaliable"});

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
        return res.json({massege:"order not found"});
    }
    order.status = req.body.status ;
    order.save();
    return res.json({massege:"success",order});
}