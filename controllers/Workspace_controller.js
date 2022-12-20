const workspace_model = require("../models/work_space")
//const validation = require("../middleware/validation")
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectId


const create_list =  async (req, res) => {
    try{
        if(!mongoose.isValidObjectId(req.body.parent_space)){
            res.json({status: "denied"})
            return
        }
        if(!await workspace_model.exists({_id: req.body.parent_space, owner: req.session.user_id})){
            res.json({status: "denied"})
            return
        }
        if(await workspace_model.exists({_id: req.body.parent_space, lists: {$elemMatch: { name: req.body.name } }})){
            res.json({status: "exists"})
            return
        }
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
        if(await workspace_model.exists({name: req.body.name})){
            res.json({status: "exists"})
            return
        }
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