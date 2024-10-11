import UserModel from "../../db/model/user.model.js";
export const checkEmail = async(req,res,next)=>{
    const {email} = req.body;
  const user = await UserModel.findOne({email});
  if(user){
    return next(new AppError("Email aleady exists",409));
  }
next();
}