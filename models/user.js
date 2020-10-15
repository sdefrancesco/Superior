const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

let User = module.exports = mongoose.model('User', userSchema)