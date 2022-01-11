const Joi = require("joi");

export const createCommentValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    comment: Joi.string().required(),
  }),
};

export const getCommentValidator = {
  params: Joi.object().keys({
    commentId: Joi.number().required(),
  }),
};

export const getCommentByPostValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

export const updateCommentValidator = {
  params: Joi.object().keys({
    commentId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      comment: Joi.string().required(),
    })
    .min(1),
};

export const deleteCommentValidator = {
  params: Joi.object().keys({
    commentId: Joi.number().required(),
  }),
};
