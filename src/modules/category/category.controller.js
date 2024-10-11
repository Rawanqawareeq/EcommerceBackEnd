import 'dotenv/config'
import CategoryModel from "../../../db/model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify from 'slugify'
export const CreateCategory =async(req,res)=>{
     req.body.name = req.body.name.toLowerCase();

    if(await CategoryModel.findOne({name:req.body.name})){
        return next(new AppError("category already exists",409));
    }
    req.body.slug = slugify(req.body.name);
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.APP_NAME}/categories`});
    req.body.image = {secure_url,public_id};
    req.body.createdBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const category = await CategoryModel.create(req.body);
    return res.status(200).json({message:"sucsess",category});
}
export const getActive = async(req,res)=>{
    const categories = await CategoryModel.find({status:'Active'}).select("name");
    return res.status(200).json({message:"sucsess",categories})
}
export const getAll =async(req,res)=>{
    const categories = await CategoryModel.find({}).populate([{
        path:"createdBy",
        select:'userName',
    },
    {
        path:"UpdatedBy",
        select:'userName',
    },
    {
        path:"subcategory",
        
    },
]);
    return res.status(200).json({message:"sucsess",categories})
}
export const getDetails =async(req,res)=>{
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    if(!category){
        return next(new AppError("category not found",404));
    }
    return res.status(200).json({message:"sucsess",category})
}
export const update = async(req,res) =>{
    const category = await CategoryModel.findById(req.params.id);
    if(!category){
        return next(new AppError("category not found",404));
    }
    category.name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return next(new AppError("category name already exists",409));
    }
    category.slug = slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
            {folder:'Rshop/categories'});
        category.image = {secure_url,public_id};
        cloudinary.uploader.destroy(category.image.public_id);
    }
    category.status = req.body.status;
    req.body.UpdatedBy = req.user._id;
    category.save();
    return res.status(200).json({message:"success",category});
}
export const deleteCategory = async(req,res)=>{ 
    const id = req.params.id;
    const category = await CategoryModel.findByIdAndDelete({_id:id});
    if(!category){
        return next(new AppError("category not found",404));
    }
    await cloudinary.uploader.destroy(category.image.public_id);
     return res.status(200).json({message:"success",category}); 
}