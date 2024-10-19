import 'dotenv/config'
import UserModel from '../../db/model/user.model.js';
import  jwt from 'jsonwebtoken';
export const Role = {
    Admin :'Admin',
    User:'User',
    SuperAdmin:'SuperAdmin'
}
export const auth =(acessRole = [])=>{
    return async(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARERTOKEN)){
        res.status(400).json({message:"invalid BEARERtoken"})
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decode = jwt.verify(token,process.env.LOGINSIG);
    if(!decode){
        res.status(400).json({message:"invalid token"})
    }
    const user = await UserModel.findById(decode.id).select("userName role");
    if(!user){
        res.status(404).json({message:"user Not found"})
 ;

    }
    if(!acessRole.includes(user.role)){
        res.status(403).json({message:"Not auth user"});
    }
    req.user = user;
    next();
    }
}