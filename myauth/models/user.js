var mangoose = require('mongoose');
var bcrypt = require('bcryptjs');
var findOrCreate = require('mongoose-findorcreate')



var UserSchema = mangoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type:String
	},
	email: {
		type:String
	}, 
	googleId: {
		type:String
	}
});
UserSchema.plugin(findOrCreate);
var User = module.exports = mangoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id,callback){
	User.findById(id,callback);
}

module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}