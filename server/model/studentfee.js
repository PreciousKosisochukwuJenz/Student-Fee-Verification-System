const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: true,
    },
    classFee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ClassFee",
      required: true,
    },
    referenceNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentFee = mongoose.model("StudentFee", schema);

module.exports = StudentFee;
