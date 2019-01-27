const mongoose = require('mongoose') //引入mongoose
const Schema = mongoose.Schema // 声明Schema
// let ObjectId = Schema.Types.ObjectId // 声明Object类型

//创建首页的Schema
const homeSchema = new Schema({
	ID: {
		unique: true,
		type:String
	},
	navCategory: Object,
	slides: Object
},{
	collection: 'Home'
})

// 发布模型
mongoose.model('Home', homeSchema);