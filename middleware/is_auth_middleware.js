module.exports = (req,res,next) => {
	if(req.session.is_auth){
		next()
	}else{
		res.redirect('/login')
	}
}
