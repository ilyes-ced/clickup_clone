const mongoose = require('mongoose')
const workspace_model = require("../models/work_space")
const User_model = require("../models/User")
const ObjectID = require('mongodb').ObjectId
//mongoose.set('debug', true)




const add_category_to_task = async (req, res) => {
  console.log(req.body)
  try{	
    if(!(mongoose.isValidObjectId(req.body.selected_task) && mongoose.isValidObjectId(req.body.category_id) && mongoose.isValidObjectId(req.body.parent_workspace) && mongoose.isValidObjectId(req.body.parent_list))){
        res.json({status: "denied"})
        return
    }
    if(req.body.parent_task_if_exists){
        if(!mongoose.isValidObjectId(req.body.parent_task_if_exists)){
            res.json({status: "denied"})
            return
        }
    }
    if(!(await workspace_model.exists({_id : req.body.parent_workspace, lists: {$elemMatch: { _id: ObjectID(req.body.parent_list) }}}))){
        res.json({status: "denied"})
        return
    }
    if(!(await workspace_model.exists({_id: req.body.parent_workspace, owner: req.session.user_id}) || User_model.exists({categories : {$elemMatch:{_id: ObjectID(req.body.type_id)}}}))){
        res.json({status: "denied"})
        return
    }
    if(!await User_model.exists({_id: req.session.user_id, categories:{$elemMatch:{_id: ObjectID(req.body.category_id)}}})){
        res.json({status: "denied"})
        return
    }

    if(req.body.parent_task_if_exists){
     

        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $set : {
                "lists.$[para1].tasks.$[para2].sub_tasks.$[para3].category": req.body.category_id
                }
        },{
            arrayFilters: [
                {"para1._id" : ObjectID(req.body.parent_list)},
                {"para2._id" : ObjectID(req.body.parent_task_if_exists)},
                {"para3._id" : ObjectID(req.body.selected_task)},
            ]   
        })
        res.json({status: 'success', name: '', color: ''})
    }else{



        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $set : {
                "lists.$[para1].tasks.$[para2].category": req.body.category_id
                }
        },{
            arrayFilters: [
                {"para1._id" : ObjectID(req.body.parent_list)},
                {"para2._id" : ObjectID(req.body.selected_task)},
            ]   
        })
        res.json({status: 'success', name: '', color: ''})
    }
    

    
}catch(e){
    res.json({status: 'error'})
    console.log(e)
}

}



















const remove_category_from_task = async (req,res) => {

}











module.exports = {
    add_category_to_task, remove_category_from_task
}