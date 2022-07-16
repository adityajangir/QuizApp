const mongoose = require('mongoose');

const tuserSchema = new mongoose.Schema({
    testuser:{
        type: String,
    },
    userid:{
        type: Number,
    },
    testname:{
        type: String,
    },
})

const Tuserinfo = mongoose.model('tuserinfo',tuserSchema)

module.exports = Tuserinfo;