const mongoose = require('mongoose');

const aschema = new mongoose.Schema({
    qpname: {
        type: String,
    },
    questionid:{
        type: String,
    },
    answer: {
        type: String,
    },
    userid: {
        type: String,
    }, 
    score: {
        type: Number,
    }
})

const Ainfo = mongoose.model('ainfo',aschema)

module.exports = Ainfo;