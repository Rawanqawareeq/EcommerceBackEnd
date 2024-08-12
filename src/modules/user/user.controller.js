import UserModel from "../../../db/model/user.model.js"

export const getUsers =async(req,res)=>{
    const user = await UserModel.find({role:'User'});
    return res.json({massege:"success",user});

}
export const userData = async(req,res)=>{
    const userData = await UserModel.findById(req.user._id);
    return res.json({massege:"success",user:userData});

}