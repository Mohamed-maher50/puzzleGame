const mongoose = require("mongoose");
const { hashPassword, generatedRandomId } = require("../utils/miscellaneous");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  iD: {
    type: String,
    default: null,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  coins: {
    type: Number,
    default: 0,
  },
  puzzles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Puzzle",
    },
  ],
  phone: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);

  this.iD = await generatedRandomId(7);

  next();
});

module.exports = mongoose.model("User", userSchema);
