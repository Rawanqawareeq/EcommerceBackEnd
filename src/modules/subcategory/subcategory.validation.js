import Joi from "joi";

export const createSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
    name:Joi.string().min(3).required(),
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
      categoryId:Joi.string().hex().length(24).required(),
      slug:Joi.string().optional(),
      status:Joi.string().valid('Active','NotActive').optional(),
      createdBy:Joi.string().hex().length(24),
      UpdatedBy:Joi.string().hex().length(24),
})
export const getSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
})