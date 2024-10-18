import  Joi from 'joi';
export const cartSchema = Joi.object({
    productId : Joi.string().hex().length(24),
   
});