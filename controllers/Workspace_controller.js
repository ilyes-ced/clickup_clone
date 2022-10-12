const workspace_model = require("../models/work_space")
const mongoose = require('mongoose')


const create_list =  async (req, res) => {
    try{
        if(!mongoose.isValidObjectId(req.body.parent_space)){
            res.json({status: "denied"})
            return
        }
        if(await workspace_model.exists({_id: req.body.parent_space, lists: {$elemMatch: { name: req.body.name } }})){
            res.json({status: "exists"})
            return
        }
        await workspace_model.findOneAndUpdate(
            { _id:  req.body.parent_space}, 
            { $push: { 
                      lists: {
                        name : req.body.name,
                        tasks : []
                        }  
                    }
            })
        res.json({status: "success"})
    }catch(e){
        console.log(e)
        res.json({status: 'unknown'})
    }
}
















module.exports = {
    create_list
}