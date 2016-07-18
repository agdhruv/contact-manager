var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var router = express.Router();

//require collection schemas
var login = require('./Models/login.js');
var user = require('./Models/user.js');

router.route('/register')
 	.post(function( req , res){
 		var userDetails = new user();
 		userDetails.name = req.body.name;
 		userDetails.email_id = req.body.email;
 		userDetails.phone = req.body.phone;
 		userDetails.save(function(err,data){
 			if(err){
 				console.log(err);
 			}
 			else{
 				console.log(data);
 			}
 		});
 		res.json({status:"done"});
 	});

module.exports = router;