const mongoose = require('mongoose');
const {Schema} = mongoose;

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
    totalscore: {
        type: Number,
    }
})

const Tuserinfo = mongoose.model('tuserinfo',tuserSchema)

module.exports = Tuserinfo;