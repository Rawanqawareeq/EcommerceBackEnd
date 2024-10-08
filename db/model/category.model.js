import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,

    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    

    }
},{timestamps:true,
    toJSON:{virtual:true},
    toObject:{virtual:true}
});
categorySchema.virtual("subcategory",{
    localField:'_id',
    foreignField:'categoryId',
    ref:'SubCategory'
})
const CategoryModel = model('Category',categorySchema);
export default CategoryModel;