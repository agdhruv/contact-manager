var mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
	name : {type : String},
	password : {type : String},
	token : {type : String}
});
module.exports = mongoose.model('login',loginSchema);