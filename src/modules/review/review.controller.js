import 'dotenv/config';
import OrderModel from "../../../db/model/order.model.js";
import reviewModel from "../../../db/model/review.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create = async(req,res)=>{
    const{productId} = req.params;
    const {comment,ratting} = req.body;
    const order = await OrderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId,
    });
    if(!order){
        res.json({massege:"con't review thie product"}); 
    }
    const checkreview = await reviewModel.findOne({userId:req.user._id,productId:productId});
   if(checkreview){
    res.json({massege:"user already review"}); 

   }
   if(req.file){
    const{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/product/${productId}/review`
    });
    req.body.image ={secure_url,public_id};
   }
   const review = await reviewModel.create({comment,productId,ratting,image:req.body.image,userId:req.user._id});
    res.json({massege:"success",review});
}