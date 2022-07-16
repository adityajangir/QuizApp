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
    }
})

const Ainfo = mongoose.model('ainfo',aschema)

module.exports = Ainfo;