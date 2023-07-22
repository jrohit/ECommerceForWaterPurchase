const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema({
  totalCapacity: {
    type: Number,
    required: [true, "Total Cap required"],
  },
  currentCapacity: {
    type: Number,
    required: [true, "Current Cap required"],
  },
});

module.exports = mongoose.model("watercollections", waterSchema);
