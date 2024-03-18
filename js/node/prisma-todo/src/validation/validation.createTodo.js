const Joi = require("joi");

const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  due_date: Joi.date(),
  completed: Joi.boolean(),
});

// Validation middleware function
const validateCreateTodo = (req, res, next) => {
  const { error, value } = createTodoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedCreateTodoData = value;
  next();
};

module.exports = {
  validateCreateTodo,
};
