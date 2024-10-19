import Joi from "joi";

export const createProductSchema = Joi.object({
  id:Joi.string().hex().length(24),
   name:Joi.string().min(3).required(),
   description:Joi.string().min(5).required(),
   stock:Joi.number().min(0).default(1),
   price:Joi.number().min(1).required(),
   discount:Joi.number().min(0).default(0),
   mainImage:Joi.array().items({
    "fieldname": Joi.string().required(),
    "originalname": Joi.string().required(),
    "encoding": Joi.string().required(),
    "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
    "destination":Joi.string().required(),
    "filename": Joi.string().required(),
    "path":Joi.string().required(),
    "size":Joi.number().max(500000).required(),
  }).max(1).required(),  
  subImage:Joi.array().items(
    Joi.object({
        "fieldname": Joi.string().required(),
        "originalname": Joi.string().required(),
        "encoding": Joi.string().required(),
        "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        "destination":Joi.string().required(),
        "filename": Joi.string().required(),
        "path":Joi.string().required(),
        "size":Joi.number().max(500000).required(),
  })).max(5).optional(),  
  status:Joi.string().valid('Active','NotActive').default('Active'),
  sized:Joi.array().items(Joi.string().valid('s','m','l','xl')).optional(),
 colors:Joi.string(),
 categoryId:Joi.string().hex().length(24),
 subcategoryId:Joi.string().hex().length(24),
});