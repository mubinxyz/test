const Joi = require("joi");

const getTodoByIdSchema = Joi.object({
  id: Joi.number().integer().positive(),
});

// Validation middleware function
const validateGetTodoById = (req, res, next) => {
  const { error, value } = getTodoByIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedTodoIdForGet = value.id;
  next();
};

module.exports = {
  validateGetTodoById,
};
