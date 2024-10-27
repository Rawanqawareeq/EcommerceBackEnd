import Joi from "joi";

export const deleteCategorySchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
});
export const getCategorySchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
});
export const updateCategorySchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3),
    status:Joi.string().valid('Active','NotActive'),
    image:Joi.array().items({
      "fieldname": Joi.string().required(),
      "originalname": Joi.string().required(),
      "encoding": Joi.string().required(),
      "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
      "destination":Joi.string().required(),
      "filename": Joi.string().required(),
      "path":Joi.string().required(),
      "size":Joi.number().max(500000).required(),
    }).max(1).required(),    
});
export const createCategorySchema =Joi.object({
    id: Joi.string().hex().length(24),
    name: Joi.string().min(3).required(),
    image:Joi.array().items({
      "fieldname": Joi.string().required(),
      "originalname": Joi.string().required(),
      "encoding": Joi.string().required(),
      "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
      "destination":Joi.string().required(),
      "filename": Joi.string().required(),
      "path":Joi.string().required(),
      "size":Joi.number().max(500000).required(),
    }).max(1).required(),   
});