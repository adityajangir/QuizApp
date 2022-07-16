const mongoose = require('mongoose');

const qschema = new mongoose.Schema({
    qpname: {
        type: String,
    },
    qname:{
        type: String,
    },
    question:{
        type: String,
    },
    type:{
        type: String,
    },
    answer: {
        type: String,
    },
    marks: {
        type: Number,
    },
    qtime: {
        type: Number,
    },
    image: {
        type: Buffer,
    }
})

const Qinfo = mongoose.model('qinfo',qschema)

module.exports = Qinfo