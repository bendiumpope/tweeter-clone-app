const Joi = require("joi");

export const getUserValidator = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

export const updateUserValidator = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteUserValidator = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

