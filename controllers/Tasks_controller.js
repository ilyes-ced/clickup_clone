const mongoose = require('mongoose')
const workspace_model = require("../models/work_space")
const User_model = require("../models/User")
const ObjectID = require('mongodb').ObjectId


const create_new_task_in_list = async (req, res) => {
	console.log(req.body)
	try{	
		if(!(mongoose.isValidObjectId(req.body.parent_workspace) && mongoose.isValidObjectId(req.body.parent_list))){
			res.json({status: "denied"})
			return
		}
		if(!(await workspace_model.findOne({_id : req.body.parent_workspace, lists: {$elemMatch: { _id: ObjectID(req.body.parent_list) }}}))){
			res.json({status: "denied"})
			return
		}
		if(!await workspace_model.exists({_id: req.body.parent_workspace, owner: req.session.user_id})){
            res.json({status: "denied"})
            return
        }

		let cat_obj = await User_model.findOne({_id: req.session.user_id}, {categories:{$elemMatch:{_id: ObjectID(req.body.category)}}})
		cat_obj = cat_obj.categories[0]
		let obj = new ObjectID()
        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $push : {
                "lists.$[para1].tasks": {
					_id : obj, name:req.body.name, description: '', tags:[], due_date: '', priority: '', category: cat_obj , type: '', progress: 0, sub_tasks:[], createdAt:Date.now(), updatedAt:Date.now()
				}
			}
        },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
            ]   
        })
		
		res.json({status: 'success', id: obj})
	}catch(e){
		res.json({status: 'error'})
        console.log(e)
	}

}





const create_new_sub_task_in_list = async (req, res) => {
	try{	
        console.log(req.body)
		if(!(mongoose.isValidObjectId(req.body.parent_workspace) && mongoose.isValidObjectId(req.body.parent_list))){
			res.json({status: "denied"})
			return
		}
		if(!(await workspace_model.findOne({_id : req.body.parent_workspace, lists: {$elemMatch: { _id: ObjectID(req.body.parent_list) }}}))){
			res.json({status: "denied"})
			return
		}
		if(!await workspace_model.exists({_id: req.body.parent_workspace, owner: req.session.user_id})){
            res.json({status: "denied"})
            return
        }

		let cat_obj = await User_model.findOne({_id: req.session.user_id}, {categories:{$elemMatch:{_id: ObjectID(req.body.category)}}})
		cat_obj = cat_obj.categories[0]
		var obj = new ObjectID()
		console.log(cat_obj)
        await workspace_model.findOneAndUpdate({_id : req.body.parent_workspace, lists : {$elemMatch:{_id:ObjectID(req.body.parent_list)}}},{
            $push : {
                "lists.$[para1].tasks.$[para2].sub_tasks": {_id : obj, name:req.body.name, description: '', tags:[], due_date: '', priority: '', category:cat_obj , type: '', progress: 0, screatedAt:Date.now(), updatedAt:Date.now()}}
                },{
                arrayFilters: [
                    {"para1._id" : ObjectID(req.body.parent_list)},
                    {"para2._id" : ObjectID(req.body.parent_task)},
            ]   
        })

		res.json({status: 'success', id: obj})
	}catch(e){
		res.json({status: 'error'})
        console.log(e)
	}

}










module.exports = {
    create_new_task_in_list,create_new_sub_task_in_list
}