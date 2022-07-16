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
    solution: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
})

const Tuserinfo = mongoose.model('tuserinfo',tuserSchema)

module.exports = Tuserinfo;