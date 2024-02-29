const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  des: {
    type: String,
  },
  deadLine: {
    type: mongoose.Schema.Types.Date,
    default: null,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
