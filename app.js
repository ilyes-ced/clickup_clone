const express = require('express')
const app = express()
const session = require('express-session')
const mongo_session = require('connect-mongodb-session')(session)
const mongo_uri = 'mongodb://localhost:27017/to_do'
const mongoose = require('mongoose')
//const server = http.createServer(app)
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())


mongoose.connect(mongo_uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const store = new mongo_session({
	uri: mongo_uri,
	collection: 'sessions_store',
}) 



app.use(session({
	secret: 'my_key',
	resave: false,
	saveUninitialized: false,
	store: store,
	cookie: {
		maxAge: 3600000*48 //2 days 
	}
}))








const pages_route = require('./routes/pages_router')

app.use('/',pages_route)
app.use('/login',pages_route)
app.use('/register',pages_route)
app.use('/logout',pages_route)
app.use('/create_list',pages_route)
app.use('/create_new_task_in_list', pages_route)
app.use('/create_new_sub_task_in_list', pages_route)
app.use('/add_tag_to_task', pages_route)
app.use('/remove_tag_from_task', pages_route)
app.use('/add_type_to_task', pages_route)
app.use('/remove_type_from_task', pages_route)
app.use('/add_category_to_task', pages_route)




















app.listen(3000);