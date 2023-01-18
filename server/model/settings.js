const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    appName : {
        type : String,
        required: true
    },
     poweredBy : {
        type : String,
        required: true
    },
}, {timestamps:true})

const Settings = mongoose.model('Settings', schema);

module.exports = Settings;
