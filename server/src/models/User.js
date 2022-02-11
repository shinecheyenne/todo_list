const mongoose = require('mongoose')
const todo = require('./Todo')

const userSchema = mongoose.Schema({
    name: {type:String, required: true, trim: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, trim: true},
    todos: {type:[todo], required:true} //도큐먼트 중첩
})

const User = mongoose.model('User', userSchema)

module.exports =User