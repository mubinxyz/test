const Joi = require("joi");
const asyncHandler = require("express-async-handler");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  role: Joi.string().valid("BASIC", "ADMIN", "SUPERADMIN").default("BASIC"),
});

// Joi validation middlware
const validateRegistration = asyncHandler((req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  req.validatedRegisterData = value;
  next();
});

module.exports = {
  validateRegistration,
};
