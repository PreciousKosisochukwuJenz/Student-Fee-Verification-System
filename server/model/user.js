const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Role",
    // required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
