const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/Auth_controller')
const Workspace_controller = require('../controllers/Workspace_controller')
const is_auth_middleware = require("../middleware/is_auth_middleware")
const workspace_model = require("../models/work_space")



const ObjectID = require('mongodb').ObjectId

router.get('/', is_auth_middleware, async (req, res) => {
    try{
        console.log(await workspace_model.findOne({_id : '634867deb36f3084534c5027', lists : {$elemMatch:{_id:'63488dce7573b9f75e636c7d'}}}))
        await workspace_model.findOneAndUpdate({_id : '634867deb36f3084534c5027', lists : {$elemMatch:{_id:'63488dce7573b9f75e636c7d'}}},{
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
                {"para1._id" : "63488dce7573b9f75e636c7d"},
            ]
        })
        
        var workspaces = await workspace_model.find({owner: req.session.user_id})
        res.render('home_page', {workspaces: workspaces})
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