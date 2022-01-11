const Joi = require("joi");

export const createLikeValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    likeType: Joi.string().required(),
  }),
};

export const getLikesValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    likeType: Joi.string().required(),
  }),
};

export const getLikeByPostValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

export const deleteLikeValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};