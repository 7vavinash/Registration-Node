var mongoose = require("mongoose");


var ChatSchema = mongoose.Schema({
	chat_id:{
		type: String,
		index: true,
		required: true
	},
	sender:{
		type: Object,
		required: true
	},
	message:{
		type: String,
		required: true
	},
	timestamp:{
		type: String
	},
	seen:{
		type: Boolean
	}
});

var Chat = module.exports = mongoose.model('Chat', ChatSchema);



