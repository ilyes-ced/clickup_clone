const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/Auth_controller')
const Workspace_controller = require('../controllers/Workspace_controller')
const is_auth_middleware = require("../middleware/is_auth_middleware")
const workspace_model = require("../models/work_space")
const user_model = require("../models/User")



const ObjectID = require('mongodb').ObjectId

router.get('/', is_auth_middleware, async (req, res) => {
    try{

       
/*
        console.log(await workspace_model.findOne({_id : '6349567708492d5e6aebb33c', lists : {$elemMatch:{_id:ObjectID('634956e6d3b6946a1e4c2c5b')}}}))
        await workspace_model.findOneAndUpdate({_id : '6349567708492d5e6aebb33c', lists : {$elemMatch:{_id:ObjectID('634956e6d3b6946a1e4c2c5b')}}},{
            $push : {
                "lists.$[para1].tasks": {
                
                            _id : new ObjectID(), name:'added task', description: "some text", sub_tasks:[{
                                _id: new ObjectID(), name:'sub task 1', description: "some text", createdAt:Date.now(), updatedAt:Date.now()
                            },{
                                _id: new ObjectID(), name:'sub task 122', description: "some text", createdAt:Date.now(), updatedAt:Date.now()
                            },{
                                _id: new ObjectID(), name:'sub task 13333', description: "some text", createdAt:Date.now(), updatedAt:Date.now()
                            },{
                                _id: new ObjectID(), name:'sub task 1444444', description: "some text", createdAt:Date.now(), updatedAt:Date.now()
                            }], createdAt:Date.now(), updatedAt:Date.now()
                        }}
                   
        },{
            arrayFilters: [
                {"para1._id" : ObjectID('634956e6d3b6946a1e4c2c5b')},
            ]
        })
        */
        var workspaces = await workspace_model.find({owner: req.session.user_id})
        var user_data = await user_model.findOne({_id: req.session.user_id}).select('-_id tags types categories')
        res.render('home_page', {workspaces: workspaces, user_data: user_data})
    }catch(e){
        console.log(e)
    }
})

router.get('/login',(req, res) => {
    res.render('login')
})

router.get('/register',(req, res) => {
    res.render('register')
})


router.post('/login',auth_controller.login)
router.post('/register',auth_controller.register)
router.post('/logout',auth_controller.logout)



router.post('/create_list', Workspace_controller.create_list)
router.post('/create_space', Workspace_controller.create_space)







module.exports = router