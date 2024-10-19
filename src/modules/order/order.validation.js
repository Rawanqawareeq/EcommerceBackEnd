import Joi from "joi";

export const createOrderSchema = Joi.object({
    couponName:Joi.string().length(4).optional(),
    address:Joi.string().required(),
    PhoneNumber:Joi.string().length(10).required(),
})
export const changeStatusSchema = Joi.object({
    orderId:Joi.string().hex().length(24).required(),
})