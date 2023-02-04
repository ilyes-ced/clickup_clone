const user_model = require('../models/User')
const bcrypt = require('bcrypt')
const ObjectID = require('mongodb').ObjectId
const workspace_model = require("../models/work_space")



const login = async (req, res)=>{
	const user = await user_model.findOne({email:req.body.email})
	if(!user) return res.render('login', { err_msg: 'email does not exist' })
	console.log(req.body.password)
	console.log(user.password)
	const matched = await bcrypt.compare(req.body.password, user.password)
	console.log(matched)
	if(!matched) res.render('login', { err_msg: 'wrong credentials' })
	req.session.is_auth = true
	req.session.username = user.username
	req.session.email = req.body.email
	req.session.user_id = user.id
	res.redirect('/')
}






const register = async (req, res)=>{
	let user = await user_model.findOne({email:req.body.email})
	if(user) res.render('register', { err_msg: 'email taken' })
	const hash_password = await bcrypt.hash(req.body.password, 10)
	user = new user_model({
		_id : new ObjectID(),
		username: req.body.username,
		email: req.body.email,
		password: hash_password,
		tags :[],
		types :[],
		categories :[{_id: new ObjectID(),name: "to do",color:'rgb(255,255,255)'}]
	})
	await user.save()


	const obj = {
		_id : new ObjectID(),
		name : 'first list',
		tasks : [],
		createdAt : Date.now(),
		updatedAt : Date.now()
	}
	new_workspace = new workspace_model({
		_id : new ObjectID(),
		name: 'first workspace',
		owner: user._id,
		lists: [obj]
	})
	await new_workspace.save()

	res.redirect('/login')
}



const logout = async (req, res)=>{
	req.session.destroy((err)=>{
		if(err) throw err
		res.redirect('/')
	})
}


module.exports = {
    login, register, logout
}