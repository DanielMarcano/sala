const Joi = require('joi');


const AlquilerSchema = Joi.object()
  .keys({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().min(3).max(14).required(),
    address: Joi.string().trim().allow(''),
    business: Joi.string().trim().allow(''),
    more: Joi.string().max(300).required(),
  });

module.exports = {
  AlquilerSchema,
  Joi,
};