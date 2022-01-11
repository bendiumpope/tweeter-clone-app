import Joi from "joi";
import { password } from "./customValidation";

export const registerValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

export const loginValidator = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const forgotPasswordValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordValidator = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const verifyEmailValidator = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
