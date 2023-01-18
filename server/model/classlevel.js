const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", schema);

module.exports = ClassLevel;
