const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 生命Schema模型

const testSchema = new Schema({
	ID: {
		unique: true,
		type: String
	},
	username: {
        unique: true,
        type: String
    },
    password: String,
    Height: Number,
    Weight: Number,
    sex: Number,
    isEighteen:Boolean,
    createAt: {
        type: Date,
        default: Date.now()
    }
},{
	collection: 'Test'
})
// 发布模型
mongoose.model('Test', testSchema)