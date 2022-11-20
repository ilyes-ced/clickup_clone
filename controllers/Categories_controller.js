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
    if(!(await workspace_model.exists({_id : req.body.parent_workspace, owner: req.session.user_id,lists: {$elemMatch: { _id: ObjectID(req.body.parent_list) }}}))){
        res.json({status: "denied"})
        return
    }
    /*
    if(!(await workspace_model.exists({_id : req.body.parent_workspace, owner: req.session.user_id}))){
        res.json({status: "denied"})
        return
    }
    */
    if(!await User_model.exists({_id: req.session.user_id, categories:{$elemMatch:{_id: ObjectID(req.body.category_id)}}})){
        res.json({status: "denied"})
        return
    }

    if(req.body.parent_task_if_exists){
        let category_object = await User_model.findOne({_id: req.session.user_id}, {categories:{$elemMatch:{_id: ObjectID(req.body.category_id)}}})
        req.body.category_id = category_object.categories[0]

        console.log(req.body.category_id )

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
        res.json({status: 'success', id: req.body.category_id._id, name: req.body.category_id.name, color: req.body.category_id.color, parent: true})
    }else{


        let category_object = await User_model.findOne({_id: req.session.user_id}, {categories:{$elemMatch:{_id: ObjectID(req.body.category_id)}}})
        req.body.category_id = category_object.categories[0]

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
        res.json({status: 'success', id: req.body.category_id._id, name: req.body.category_id.name, color: req.body.category_id.color})
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