import 'dotenv/config'
import UserModel from "../../../db/model/user.model.js"
import bcrypt  from 'bcrypt';
import  jwt from 'jsonwebtoken';
import { sendEmail } from '../../utls/email.js';
import { customAlphabet} from 'nanoid';

export const register = async(req,res,next)=>{

  const {userName,email,password} = req.body;
  const hashpassword = await  bcrypt.hashSync(password,parseInt(process.env.SALTROUNDS));
  const createuser = await UserModel.create({userName,email,password:hashpassword});
  const token  = jwt.sign({email},process.env.CONFIRM_EMAIL_TOKEN);
  await sendEmail(email,`Welcome`,userName,token);
  return res.status(201).json({message:"success",user:createuser});
}
export const comfirmEmail = async(req,res)=>{
   const token = req.params.token;
   const decoded = jwt.verify(token,env.CONFIRM_EMAIL_TOKEN);
   await UserModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
   return res.status(200).json({message:"success"});
}
export const login = async(req,res)=>{
     const{email,password} = req.body;
     const user = await UserModel.findOne({email});
     if(!user){
      return res.status(404).json({message:"Email Not exists"});
     }
     if(!user.confirmEmail){
      return res.status(400).json({message:"Plz confirm email"});
     }
     const match = await bcrypt.compare(password,user.password);
     if(user.status == "NotActive"){
      return res.status(400).json({message:"your account is blocked"});     }
     if(!match){
      return res.status(400).json({message:"password is wrong"});
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