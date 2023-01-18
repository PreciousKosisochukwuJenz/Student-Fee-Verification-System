const mongoose = require('mongoose');

var schema = new mongoose.Schema({
     role:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Role',
        required: true
    },
      permission:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Permission',
        required: true
    },
    isAssigned:{
        type:Boolean,
    }
}, {timestamps:true})

const RolePermission = mongoose.model('RolePermission', schema);

module.exports = RolePermission;
