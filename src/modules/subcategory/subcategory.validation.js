import Joi from "joi";

export const createSubCategorySchema = Joi.object({
    name:Joi.string().required(),
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
      slug:Joi.string().required(),
      status:Joi.string().valid('Active','NotActive').optional(),
      categoryId:Joi.string().hex().length(24).required(),
      createdBy:Joi.string().hex().length(24).required(),
      UpdatedBy:Joi.string().hex().length(24).required(),
})
export const getSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})