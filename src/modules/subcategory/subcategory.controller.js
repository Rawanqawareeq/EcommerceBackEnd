import 'dotenv/config'
import slugify from "slugify";
import CategoryModel from '../../../db/model/category.model.js';
import SubcategoryModel from '../../../db/model/subcategory.model.js';
import cloudinary from '../../utls/cloudinary.js';
export const create = async(req,res)=>{
    const {categoryId} = req.body;
    const category = CategoryModel.findById(categoryId);
   
    req.body.name = req.body.name.toLowerCase();
  
    if(!category){
        return res.status(409).json({message:"category Not found"});
    }
    
    if(await SubcategoryModel.findOne({name:req.body.name}) ){
        return res.status(409).json({message:"subcategory aleady exists"})
    }
    req.body.slug = slugify(req.body.name);
 

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.APP_NAME}/subcategory`}
    );
    req.body.image =  {secure_url,public_id};
  
    req.body.createdBy = req.user._id;
    req.body.UpdatedBy= req.user._id;
    const subcategory = await SubcategoryModel.create(req.body);
    return res.status(200).json({message:"sucess",subcategory});

}
export const getAll = async(req,res)=>{
   const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        return res.status(409).json({message:"Main category Not found"});

    }
   const subcategory = await SubcategoryModel.find({categoryId:id});
    return res.status(200).json({massege:"scucess",subcategory});
}