const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
})

const Userinfo = mongoose.model('userinfo',userSchema)

module.exports = Userinfo;