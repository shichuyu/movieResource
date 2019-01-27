const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 声明Schema
let ObjectId = Schema.Types.ObjectId // 声明Object类型
const bcrypt = require('bcrypt') // 一个跨平台的文件加密工具
const SALT_WORK_FACTOR = 10

// 创建用户的Schema
const userSchema = new Schema({
	UserId: ObjectId, // 声明object, 字符串转ObjectId
	username: {
		unique: true, // 是否独一无二的，true为是
		type: String
	},
	password: String,
	creatAt: {
		type: Date,
		default: Date.now()
	},
	lastLoginAt: {
		type: Date,
		default: Date.now()
	}
},{
	collection: 'users'
})
// 每次存储用户数据时都要进行加盐加密处理，对密码进行保护
userSchema.pre('save', function(next){
	let user = this;
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err)
			this.password = hash
			next()
		})
	})
})

// 前端与后台密码比对的方法
userSchema.methods = {
	comparePassword: (_password,password) =>{
		return new Promise((resolve,reject) => {
			bcrypt.compare(_password, password, (err, res) => {
				if (!err) resolve(res)
				else reject(err)
			})
		})
	}
}

// 发布模型
mongoose.model('User', userSchema);