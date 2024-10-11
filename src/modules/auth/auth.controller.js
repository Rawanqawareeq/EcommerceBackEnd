import 'dotenv/config'
import UserModel from "../../../db/model/user.model.js"
import bcrypt  from 'bcrypt';
import  jwt from 'jsonwebtoken';
import { sendEmail } from '../../utls/email.js';
import { customAlphabet} from 'nanoid';
export const register = async(req,res)=>{
  const {userName,email,password} = req.body;
  const hashpassword = await  bcrypt.hashSync(password,parseInt(process.env.SALTROUNDS));
  const createuser = await UserModel.create({userName,email,password:hashpassword});
  const token  = jwt.sign({email},process.env.CONFIRM_EMAILtOKEN);
  await sendEmail(email,`Welcome`,userName,token);
  return res.status(201).json({message:"success",user:createuser});
}
export const comfirmEmail = async(req,res)=>{
   const token = req.params.token;
   const decoded = jwt.verify(token,env.CONFIRM_EMAILtOKEN);
   await UserModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
   return res.status(200).json({message:"success"});
}
export const login = async(req,res)=>{
     const{email,password} = req.body;
     const user = await UserModel.findOne({email});
     if(!user){
      return next(new AppError("Email Not exists",404));
     }
     if(!user.confirmEmail){
      return next(new AppError("Plz confirm email",400));
     }
     const match = await bcrypt.compare(password,user.password);
     if(user.status == "NotActive"){
      return next(new AppError("your account is blocked",400));
     }
     if(!match){
      return next(new AppError("password is wrong",400));
     }
     const token = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSIG);
     return res.status(200).json({message:"success",token});
   }
export const SendCode = async(req,res)=>{
   const {email} = req.body;
   const code = customAlphabet('1234567890abcdef', 4)();
   const user = await UserModel.findOneAndUpdate({email},{sendcode:code},{new:true});
   if(!user){
      return next(new AppError("Email Not exists",404));
   }
   return res.status(200).json({message:"success"});
}
export const forgetpassword = async(req,res) =>{
   const{email,code,password} = req.body;  
   const user = await UserModel.findOne({email});
   if(!user){
      return res.status(404).json({message:"Email Not exists"});
   }
   if(user.sendcode != code){
      return res.status(404).json({message:"invalid code"});
   }
   user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUNDS));   
   user.sendcode = null;
   user.save(); 
   return res.status(200).json({massege:"success"});
}