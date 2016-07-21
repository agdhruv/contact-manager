var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
	app.use(morgan('dev'));
var jwt = require('jsonwebtoken');
var session = require('express-session');
var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
var routes = require('./route');
	app.use('/api', routes);

//Connect to db
mongoose.connect('mongodb://localhost:27017/contact-manager', function(err){
	if(!err){
		console.log("connection successful");
	}
	else{
		console.log(err);
	}
});

app.get('/',function(req,res) {
	res.send("Running");
});//send home page

app.listen(4000);//start server