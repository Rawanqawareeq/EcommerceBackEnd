import CouponModel from "../../../db/model/coupon.model.js";

export const create = async(req,res)=>{
    if(await CouponModel.findOne({name:req.body.name})){
       return  res.status(409).json({message:"name aready exsits"});
    }
    req.body.expiredDate = new Date(req.body.expiredDate);
    req.body.createdBy = req.user._id;
    const coupon = await CouponModel.create(req.body);
    return  res.status(200).json({message:"success",coupon});
}