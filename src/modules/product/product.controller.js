import 'dotenv/config'
import slugify from "slugify";
import CategoryModel from "../../../db/model/category.model.js";
import SubcategoryModel from "../../../db/model/subcategory.model.js";
import ProductModel from '../../../db/model/product.model.js'
import cloudinary from "../../utls/cloudinary.js";

export const create =async(req,res)=>{
  const{name,description,price,categoryId,subcategoryId} = req.body;
  const checkcategory = await CategoryModel.findById(categoryId);
  if(!checkcategory){
    res.status(404).json({massege:"category not found"});
  }
  const checksubcategory = await SubcategoryModel.findOne({_id:subcategoryId,categoryId});
  if(!checksubcategory){
   
  }
  req.body.name = name.toLowerCase();
  req.body.Slug= slugify(req.body.name);
  const finalPrice =0;
    req.body.finalPrice =  price-(price * (req.body.discount || 0)/100 );
   
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:
    `${process.env.APP_NAME}/product/${name}`});
    req.body.mainImage = {secure_url,public_id};
    req.body.subImage =[];
    for (const file of req.files.subImage) {
        const{secure_url,public_id}= await cloudinary.uploader.upload(file.path,{folder:`${process.env.APP_NAME}/product/${name}/subImage`});
        req.body.subImage.push({secure_url,public_id});
    }
    
   const product = await ProductModel.create(req.body);
   res.status(200).json({massege:'sucess',product});
}
export const get = async(req,res)=>{
   const product = await ProductModel.find({}).populate({
     path:'review',
     populate:{
       path:'userId',
       select:'userName'
     },
   });
   return res.json({massege:'success',product});
}