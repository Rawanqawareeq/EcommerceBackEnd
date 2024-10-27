import CartModel from "../../../db/model/cart.model.js";
export const getcart =async (req,res)=>{
    const cart = await CartModel.findOne({userId:req.user._id}).select("products");
    return res.status(200).json({massege:"success",cart});
}
export const create = async(req,res)=>{
    const{productId} = req.body;
    const cart = await CartModel.findOne({userId:req.user._id});
    if(!cart){
        const newcart = await CartModel.create({
            userId:req.user._id, 
            products :{productId}});
        return res.status(200).json({message:"success",cart:newcart});
    }
    for(let i=0; i < cart.products.length;i++){
        if(cart.products[i].productId == productId){
            return res.status(409).json({massege:"product aleady exsits"});
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.status(200).json({message:"success",cart});
}
export const updateQuantity = async(req,res)=>{
    const{quantity,oparator} = req.body;
     const inc = oparator =="+"?quantity:-quantity;
    const cart = await CartModel.findOneAndUpdate({userId:req.user._id,"products.productId":req.params.id},{
        $inc:{
           "products.$.quantity":inc,
        }       
    },{new:true});
    return res.json({message:"success",cart});
}
export const deleteproduct = async(req,res)=>{
    const {productId} = req.params.id;
    const cart = await CartModel.findOneAndUpdate({userId:req.user._id},{
        $pull:{
            productId,
        }
    },{new:true});
    return res.status(200).json({message:"success",cart})
}
export const remove =async(req,res)=>{
  return res.json({message:"ok"});
   const cart = await CartModel.findOneAndUpdate({userId:req.user._id},{
            products:[],
    },{new:true});
    return res.status(200).json({message:"success",cart});
}
