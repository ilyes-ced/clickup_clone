const mongoose = require('mongoose')
const workspace_model = require("../models/work_space")
const User_model = require("../models/User")
const ObjectID = require('mongodb').ObjectId
//mongoose.set('debug', true)




const add_tag_to_task = async (req, res) => {
    try{	
		if(!(mongoose.isValidObjectId(req.body.selected_task) && mongoose.isValidObjectId(req.body.tag_id) && mongoose.isValidObjectId(req.body.parent_workspace) && mongoose.isValidObjectId(req.body.parent_list))){
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
        if(!(await workspace_model.exists({_id: req.body.parent_workspace, owner: req.session.user_id}) || User_model.exists({tags : {$elemMatch:{_id: ObjectID(req.body.tag_id)}}}))){
            res.json({status: "denied"})
            return
        }
        if(!await User_model.exists({_id: req.session.user_id, tags:{$elemMatch:{_id: ObjectID(req.body.tag_id)}}}).select('-_id tags')){
            res.json({status: "denied"})
            return
        }

        if(req.body.parent_task_if_exists){
            let tag_object = await User_model.findOne({_id: req.session.user_id}, {tags:{$elemMatch:{_id: ObjectID(req.body.tag_id)}}})
            req.body.tag_id = tag_object.tags[0]


            await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
                $push : {
                    "lists.$[para1].tasks.$[para2].sub_tasks.$[para3].tags": req.body.tag_id
                    }
            },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
                    {"para2._id" : ObjectID(req.body.parent_task_if_exists)},
                    {"para3._id" : ObjectID(req.body.selected_task)},
                ]   
            })
		    res.json({status: 'success'})
        }else{
   
            let tag_object = await User_model.findOne({_id: req.session.user_id}, {tags:{$elemMatch:{_id: ObjectID(req.body.tag_id)}}})
            req.body.tag_id = tag_object.tags[0]

            
            let existing_tag_object = await workspace_model.findOne({_id: req.body.parent_workspace},
            {lists: {$elemMatch: { _id: ObjectID(req.body.parent_list) }}},
            )
            /*

            {tasks:{$elemMatch:{_id: ObjectID(req.body.selected_task)}}},
            {tags:{$elemMatch:{_id: req.body.tag_id._id}}},
            */
            console.log(existing_tag_object.lists[0].tasks)

            await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
                $push : {
                    "lists.$[para1].tasks.$[para2].tags": req.body.tag_id
                    }
            },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
                    {"para2._id" : ObjectID(req.body.selected_task)},
                ]   
            })
		    res.json({status: 'success'})
        }
        
        

/*
        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $push : {
                "lists.$[para1].tasks": {_id : new ObjectID(), name:req.body.name, description: "", sub_tasks:[], createdAt:Date.now(), updatedAt:Date.now()}}
                },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
            ]   
        })*/
		
	}catch(e){
		res.json({status: 'error'})
        console.log(e)
	}
}



















const remove_tag_from_task = async (req,res) => {
    try{	
		if(!(mongoose.isValidObjectId(req.body.selected_task) && mongoose.isValidObjectId(req.body.tag_id) && mongoose.isValidObjectId(req.body.parent_workspace) && mongoose.isValidObjectId(req.body.parent_list))){
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
        if(!(await workspace_model.exists({_id: req.body.parent_workspace, owner: req.session.user_id}) || User_model.exists({tags : {$elemMatch:{_id: ObjectID(req.body.tag_id)}}}))){
            res.json({status: "denied"})
            return
        }
        if(!await User_model.exists({_id: req.session.user_id, tags:{$elemMatch:{_id: ObjectID(req.body.tag_id)}}})){
            res.json({status: "denied"})
            return
        }

        if(req.body.parent_task_if_exists){
         

            await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
                $pull : {
                    "lists.$[para1].tasks.$[para2].sub_tasks.$[para3].tags": {_id : ObjectID(req.body.tag_id)}
                    }
            },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
                    {"para2._id" : ObjectID(req.body.parent_task_if_exists)},
                    {"para3._id" : ObjectID(req.body.selected_task)},
                ]   
            })
		    res.json({status: 'success'})
        }else{
   


            await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
                $pull : {
                    "lists.$[para1].tasks.$[para2].tags": {_id : ObjectID(req.body.tag_id)}
                    }
            },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
                    {"para2._id" : ObjectID(req.body.selected_task)},
                ]   
            })
		    res.json({status: 'success'})
        }
        
        

/*
        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $push : {
                "lists.$[para1].tasks": {_id : new ObjectID(), name:req.body.name, description: "", sub_tasks:[], createdAt:Date.now(), updatedAt:Date.now()}}
                },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
            ]   
        })*/
		
	}catch(e){
		res.json({status: 'error'})
        console.log(e)
	}
}











module.exports = {
    add_tag_to_task, remove_tag_from_task
}