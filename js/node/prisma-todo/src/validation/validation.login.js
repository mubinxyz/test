const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Validation middleware function
const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  req.validatedLoginData = value;

  next();
};

module.exports = {
  validateLogin,
};
