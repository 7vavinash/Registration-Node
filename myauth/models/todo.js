var mongoose = require('mongoose')

var TodoSchema = new mongoose.Schema({
	task:{
		type: String,
		required: true
	},
	timestamp:{
		type: Date,
		default: Date.now()
	}

});

Todo = module.exports = mongoose.model('Todo', TodoSchema); 

module.exports = {

	find: function(params, callback) {
		Todo.find(params, function(err, todos){
			if (err){
				callback(err, null);
				return;
			}
			callback (null, todos);
		});
	},

	create: function(params, callback){
		Todo.create(params, function(err, todo){
			if (err){
				callback(err, null);
				return;
			}
			callback(null, todo);
		});
	},

	update: function(id, params, callback){
		Todo.findByIdAndUpdate(id, params, {new:true}, function(err, todo){
			if (err){
				callback(err, null);
				return;
			}
			callback(null, todo);
		});
	},

	delete: function(params, callback){
		Todo.findByIdAndRemove(params, function(err){
			if (err){
				callback(err, null);
				return;
			}
			callback (null, null);
		});
	} 
}