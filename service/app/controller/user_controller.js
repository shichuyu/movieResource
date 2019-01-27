const config = require('../../config');
const passport = require('../utils/passport');// 加盐加密 密码校对方法
const user_col = require('../models/User');
const uuidv1 = require('uuid/v1'); //生成一个v1的uuid

const getTest = async (ctx, next) => {
	console.log(ctx);
	ctx.status = 200;
	ctx.body = {
		msg: 'get request',
		data: {
			data: ctx.request.query
		}
	}
}

module.exports = {
	getTest
}