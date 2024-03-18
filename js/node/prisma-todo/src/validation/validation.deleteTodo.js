const Joi = require("joi");

const deleteTodoSchema = Joi.object({
  id: Joi.number().integer().positive(),
});

// Validation middleware function
const validateDeleteTodo = (req, res, next) => {
  const { error, value } = deleteTodoSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedTodoIdForDelete = value.id;
  next();
};

module.exports = {
  validateDeleteTodo,
};
