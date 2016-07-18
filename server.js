var express = require('express');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');

//Connect to db
mongoos.connect('mongodb://localhost:27017/contact-manager', function(err){
	if(!err){
		console.log("connection successful");
	}
	else{
		console.log(err);
	}
});

app.get('/',function(req,res) {
	res.send("Running");
});

app.listen(3000);