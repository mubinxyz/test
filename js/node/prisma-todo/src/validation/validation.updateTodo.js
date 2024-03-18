const Joi = require("joi");

// Define Joi schema for validation
const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  due_date: Joi.date(),
  completed: Joi.boolean(),
});

// Validation middleware function
const validateUpdateTodo = (req, res, next) => {
  const { error, value } = updateTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedUpdateTodoData = value;
  next();
};

module.exports = {
  validateUpdateTodo,
};
