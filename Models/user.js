var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	name : {type : String},
	email_id : {type : String},
	phone : {type : Number},
	contacts : [{
		name : {type : String},
		email_id : {type : String},
		phone : {type : Number}
	}]
});
module.exports = mongoose.model('user',userSchema);