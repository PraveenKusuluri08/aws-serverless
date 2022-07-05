const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: false,
    },
    description: {
      type: String,
      required: true,
      trime: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Todo", todoSchema)
