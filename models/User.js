const mongoose = require('mongoose')
const schema = mongoose.Schema

const user_schema= new schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
},{timestamps: true}) 

const User = mongoose.model('User',user_schema)

module.exports = User
