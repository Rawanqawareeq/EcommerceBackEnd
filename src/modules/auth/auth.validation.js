import  Joi from 'joi';
export const registerSchema = Joi.object({
   userName : Joi.string().min(3).max(20).required(),
   email:Joi.string().email().required(),
   password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/).required(),
   confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
});
export const sendCodeSchema = Joi.object({
   email:Joi.string().email().required(),
});
export const forgetpassword = Joi.object({
   email:Joi.string().email().required(),
   password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/).required(),
   code:Joi.string().length(4).required(),
});