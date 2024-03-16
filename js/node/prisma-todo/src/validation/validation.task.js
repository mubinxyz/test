const validateTaskSchema = Joi.object({
  id: Joi.number().integer(),
  title: Joi.string().required(),
  description: Joi.string().allow(null).optional(),
  due_date: Joi.date().allow(null).optional(),
  completed: Joi.boolean().default(false),
  userId: Joi.number().integer().required(),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(new Date()),
});

module.exports = {
  validateTaskSchema,
};
