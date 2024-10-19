import  Joi from 'joi';
export const createCartSchema = Joi.object({
    productId : Joi.string().hex().length(24).required(),
   
});
export const updateQuantitySchema = Joi.object({
    quantity: Joi.number().default(1).optional(),
    oparator:Joi.string().valid('+','-').required(),
    id:Joi.string().hex().length(24).required(),
});
export const deleteProductSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});
