const Joi = require("joi");

export const createPostValidator = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

export const getPostValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

export const getPostByAuthorValidator = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

export const updatePostValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().required(),
    })
    .min(1),
};

export const deletePostValidator = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};
