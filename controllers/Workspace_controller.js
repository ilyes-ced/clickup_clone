const workspace_model = require("../models/work_space")
const validation = require("../middleware/validation")
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectId


const create_list =  async (req, res) => {
    try{
        validation.is_object(req.body)
        validation.list_exists(req.body)
        validation.list_owned(req.body, req.session.user_id)
      
        const obj = {
            _id : new ObjectID(),
            name : req.body.name,
            tasks : [],
            createdAt : Date.now(),
            updatedAt : Date.now()
        }
        await workspace_model.findOneAndUpdate(
            { _id:  req.body.parent_space}, 
            { $push: { 
                      lists: obj
                    }
        })
        res.json({status: "success",id: obj._id,name:obj.name})
    }catch(e){
        console.log(e)
        res.json({status: 'unknown'})
    }
}















const create_space =  async (req, res) => {
    try{
        validation.workspace_exists(req.body)
        new_workspace = new workspace_model({
            _id : new ObjectID(),
            name: req.body.name,
            owner: req.session.user_id,
        })
        await new_workspace.save()
        console.log(new_workspace)
        res.json({status: "success", id: new_workspace._id, name:new_workspace.name})
    }catch(e){
        console.log(e)
        res.json({status: 'unknown'})
    }
}















module.exports = {
    create_list, create_space
}