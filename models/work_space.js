const mongoose = require('mongoose')
const schema = mongoose.Schema

const work_space_schema= new schema({
    name: {type:String,required:true},
    owner: {type:String,required:true},
    lists: [Object],
    createdAt : {type:String, default:Date.now()},
    updatedAt : {type:String, default:Date.now()}
}) 

const work_space = mongoose.model('work_space',work_space_schema)

module.exports = work_space
