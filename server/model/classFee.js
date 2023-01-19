const mongoose = require("mongoose");
const { Fees } = require("./enums");
var schema = new mongoose.Schema({
  fee: {
    type: String,
    required: true,
    enum: Fees,
  },
  class: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ClassLevel",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const ClassFee = mongoose.model("ClassFee", schema);

module.exports = ClassFee;
