const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  // validating the information parsed to the schema
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data, Joi);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data, Joi);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
