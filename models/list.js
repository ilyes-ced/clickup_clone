const mongoose = require('mongoose')
const schema = mongoose.Schema

const list_schema= new schema({
    name: {type:String,required:true},
    tasks: [{}],
},{timestamps: true}) 

const list = mongoose.model('list',list_schema)

module.exports = list
