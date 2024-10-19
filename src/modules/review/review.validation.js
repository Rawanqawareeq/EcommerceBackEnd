import Joi from "joi";

export const createReviewschema = Joi.object({
    productId:Joi.string().hex().length(24).required(),
    comment:Joi.string().required(),
    ratting:Joi.number().min(0).max(5).required(),
})