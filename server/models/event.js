const Joi = require('joi');

const Event = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  type: Joi.string()
    .trim()
    .required(),
  description: Joi.string()
    .trim()
    .required(),
  poster: Joi.string()
    .trim()
    .required(),
  backgroundPoster: Joi.string()
    .trim()
    .optional(),
  contact: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    subject: Joi.string().required(),
  }),
  link: Joi.string()
    .trim()
    .email()
    .optional(),
  with: Joi.array(Joi.type.string),
  fullDateTime: Joi.array(Joi.type.string),
});

module.exports = {
  Event,
  Joi,
};
