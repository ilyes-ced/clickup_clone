const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/Auth_controller')
const is_auth_middleware = require("../middleware/is_auth_middleware")
const workspace_model = require("../models/work_space")



router.get('/', is_auth_middleware, async (req, res) => {
    try{
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



module.exports = router