var mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
	email_id : {type : String},
	password : {type : String},
	token : {type : String}
});
module.exports = mongoose.model('login',loginSchema);