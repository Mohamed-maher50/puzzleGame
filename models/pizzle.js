const mongoose = require("mongoose");

const PizzleSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startTime: {
    type: Number,
    default: 0,
  },
  endTime: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    enum: [3, 4, 5],
    required: true,
  },
});

module.exports = mongoose.model("Puzzle", PizzleSchema);
