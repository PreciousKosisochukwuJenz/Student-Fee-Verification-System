const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ClassLevel",
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  regnumber: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", schema);

module.exports = Student;
