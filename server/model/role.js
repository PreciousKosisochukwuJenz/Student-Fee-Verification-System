const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    description : {
        type : String,
        required: true
    },
}, {timestamps:true})

const Role = mongoose.model('Role', schema);

module.exports = Role;
