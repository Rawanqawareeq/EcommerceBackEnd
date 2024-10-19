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
        return next(new AppError("invalid BEARERtoken",400));
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decode = jwt.verify(token,process.env.LOGINSIG);
    if(!decode){
        return next(new AppError("invalid token",400));
    }
    const user = await UserModel.findById(decode.id).select("userName role");
    if(!user){
        return next(new AppError("user Not found",404));

    }
    if(!acessRole.includes(user.role)){
        return next(new AppError("Not auth user",403));
    }
    req.user = user;
    next();
    }
}