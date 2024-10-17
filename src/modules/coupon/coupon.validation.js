import Joi from "joi";

export const creatCouponSchema = Joi.object({
    name: Joi.string().required(),
   amount:Joi.number().min(1).max(50).optional(),
   expiredDate:Joi.date().greater('now'),
});