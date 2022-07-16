const mongoose = require('mongoose');

const qpschema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    totaltime:{
        type: Number,
    },
    description:{
        type: String,
    }
})

const Qpinfo = mongoose.model('info',qpschema)

module.exports = Qpinfo