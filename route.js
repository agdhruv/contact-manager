var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var router = express.Router();
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

//require collection schemas
var login = require('./Models/login.js');
var user = require('./Models/user.js');

router.route('/register')
 	.post(function(req , res){
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

 		var loginDetails = new login();
 		loginDetails.email_id = req.body.email;
 		loginDetails.password = req.body.password;
 		loginDetails.save(function(err,data){
 			if(err){
 				console.log(err);
 			}
 			else{
 				console.log(data);
 			}
 		});
 		res.json({status:"done"});
 	});


router.route('/login')
 	.post(function(req,res){
	 		//find the user
		  	login.findOne({
		    email_id: req.body.email
		},function(err,user){
    		//console.log(user);
    		if (err) throw err;
    		if(!user){
      			res.json({ success: false, message: 'Authentication failed. User not found.' });
    		}
    		else if(user){
      			// check if password matches
      			if (user.password != req.body.password) {  
			        console.log(user.password);
			        console.log(req.body.password);
        			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      			}
            else{
			        // if user is found and password is right
			        // create a token
        			var token = jwt.sign(user,'superSecret');
        			login.update({
        				"email_id" : user.email_id
        			},{
        				$set: { token: token }
        			},function(err,data){
        				if(err){console.log(err);}
        				else{console.log(data);}
        			});
        			console.log(user);
					   // return the information including token as JSON
			        res.json({
			          success: true,
			          message: 'Enjoy your token!',
			          token: token
			        });
    			}   
    		}
  		});
	});

  router.route('/getDetails')
  .post(function(req,res){
    var verificationToken = req.headers['token'];

    login.findOne({token:verificationToken}, function(err,data){
      if(err){
        res.send("Error in query");
      }
      else if(data === null || undefined || ''){
        res.json("Token not found");
      }
      else{
        user.findOne({email_id:data.email_id},function(err,user){
          res.send(user);
        })
      }
    });
  });

  router.route('/addContact')
    .post(function(req,res){
    var verificationToken = req.headers['token'];

    login.findOne({token:verificationToken}, function(err,data){
      if(err){
        res.send("Error in query");
      }
      else if(data === null || undefined || ''){
        res.json("Token not found");
      }
      else{
        var contactName = req.body.contactName,
            contactEmail = req.body.contactEmail,
            contactPhone = req.body.contactPhone;
        user.update({
          email_id:data.email_id
        },{
          $push : {"contacts" : {"name" : contactName,"email_id" : contactEmail, "phone" : contactPhone}}
        },function(err,result){
          if(err){console.log(err);}
          else{res.send(result);}
        });
      }
    });
  });

  router.route('/getContact')
    .post(function(req,res){
        var verificationToken = req.headers['token'];

        login.findOne({token:verificationToken}, function(err,data){
          if(err){
            res.send("Error in query");
          }
          else if(data === null || undefined || ''){
            res.json("Token not found");
          }
          else{
            user.findOne({
              email_id:data.email_id
            },{contacts : 1, _id : 0},function(err,result){
              if(err){console.log(err);}
              else{res.send(result);}
            });
          }
        });
    });

    router.route('/deleteContact')
      .post(function(req,res){
        var verificationToken = req.headers['token'];

        login.findOne({token:verificationToken}, function(err,data){
          if(err){
            res.send("Error in query");
          }
          else if(data === null || undefined || ''){
            res.json("Token not found");
          }
          else{
            var contactNameToDelete = req.body.delName;
            user.update({
              email_id : data.email_id
            },{$pull : {contacts :{name: contactNameToDelete}}},function(err,result){
              if(err){console.log(err);}
              else{res.send(result);}
            })
          }
        });
      });

      router.route('/updateContact')
        .post(function(req,res){
          var verificationToken = req.headers['token'];
          login.findOne({token:verificationToken}, function(err,data){
            if(err){
              res.send("Error in query");
            }
            else if(data === null || undefined || ''){
              res.json("Token not found");
            }
            else{
              var emailToUpdate = req.body.emailToUpdate,
                  updatedName = req.body.newName,
                  updatedEmail = req.body.newEmail,
                  updatedPhone = req.body.newPhone;
              user.update({
                email_id : data.email_id
              },{
                $pull : {"contacts" : { "email_id" : emailToUpdate}}
              },function(err,result){
                if(err){console.log(err);}
                else{
                  user.update({
                  email_id : data.email_id
                  },{
                    $push : {"contacts" : {"name" : updatedName,"email_id" : updatedEmail, "phone" : updatedPhone}}
                  },function(err,resultNew){
                    if(err){console.log(err);}
                    else{res.send(resultNew);}
                  });
                }
              });
            }
          });
        });

      router.route('/logout')
        .post(function(req,res){
          var verificationToken = req.headers['token'];

          login.findOne({token:verificationToken}, function(err,data){
            if(err){
              res.send("Error in query");
            }
            else if(data === null || undefined || ''){
              res.json("Token not found");
            }
            else{
              login.update({
                token : verificationToken
              },{
                $unset : {"token" : ""}
              },function(err,result){
                if(err){console.log(err);}
                else{res.send(result);}
              });
            }
          });
        });

module.exports = router;









