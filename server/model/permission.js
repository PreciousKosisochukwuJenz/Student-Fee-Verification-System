const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    description : {
        type : String,
        required: true
    },
     url : {
        type : String,
        required: true
    },
}, {timestamps:true})

const Department = mongoose.model('Department', schema);

module.exports = Department;
