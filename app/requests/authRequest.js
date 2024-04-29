import Joi from "joi";

export const loginRequest = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).required()
});
export const registerRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    password_confirmation: Joi.ref('password')
});
export const userUpdateDataRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});
export const userUpdatePasswordRequest = Joi.object({
    old_password: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
    password_confirmation: Joi.ref('password')
});
export const userDestroyRequest = Joi.object({
    password: Joi.string().min(4).required()
});