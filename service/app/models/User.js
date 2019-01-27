const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	userId: {
		type: String,
		unique: true,
		require: true
	},
	username: {
		unique: true,
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	wechat: {
		type: String
	},
	qq: {
		type: String
	},
	creatAt: {
		type: Date,
		default: Date.now()
	},
	lastLoginAt: {
		type: Date,
		default: Date.now()
	}
},{
	collection: 'User', 
	versionKey: false
});

module.exports = mongoose.model('User', UserSchema);