var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.get('/',function(req,res) {
	res.send("Running");
});

app.listen(3000);