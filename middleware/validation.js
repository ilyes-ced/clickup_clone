const workspace_model = require("../models/work_space")
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectId




const is_object = (arg) =>{ 
    if(!mongoose.isValidObjectId(arg.parent_space)){
        res.json({status: "denied"})
        return
    }
}
const list_exists = async (arg) =>{
    if(await workspace_model.exists({_id: arg.parent_space, lists: {$elemMatch: { name: arg.name } }})){
        res.json({status: "exists"})
        return
    }
}
const list_owned = async (arg, user_id) =>{
    if(!await workspace_model.exists({_id: arg.parent_space, owner: user_id})){
        res.json({status: "denied"})
        return
    }
}









const workspace_exists = async (arg) =>{
    if(await workspace_model.exists({name: arg.name})){
        res.json({status: "exists"})
        return
    }
}



module.exports = {
    is_object, list_exists, list_owned, workspace_exists
}