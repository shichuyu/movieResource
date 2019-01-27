const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router()
router.get('/', async(ctx) => {
	ctx.body = '这是用户登录页'
})

// 用户注册
router.post('/register', async(ctx) => {
	console.log(ctx)
	// 引入user的model
	const User = mongoose.model('User')
	// 把从前端接收的POST数据封装成一个新的user对象
	let newUser = new User(ctx.request.body)
	// 用mongoose的save方法直接存储，然后判断是否存储成功，再返回
	await newUser.save().then(() => {
		console.log('插入成功：\n')
		User.findOne({}, function(err, data){
			if (err) {
				return console.error(err);
			}
			console.log("插入的数据为：\n"+data);
		});
		// 返回成功code=200，并返回成功信息
		ctx.body = {
			code: 200,
			data: '注册成功'
		}
	}).catch((err) => {
		// 失败返回code=500，并返回错误信息
		console.error(err);
		ctx.body = {
			code: 500,
			data: err
		}
	})
})

// 用户登录
router.post('/login', async(ctx) => {
	console.log(ctx)
	let loginUser = ctx.request.body;
	let username = loginUser.username
	let password = loginUser.password

	// 引入User的model
	const User = mongoose.model('User')
	// 查找用户名是否存在
	await User.findOne({username:username}).exec().then(async(result) => {
		console.log(result)
		if (result) {
			// 当用户名存在时，开始比对密码
			let newUser = new User() // 因为是实例方法，所以要new出对象，才能调用
			await newUser.comparePassword(password, result.password).then(res => {
				console.log('查询成功：\n'+res)
				ctx.body = {
					code: 200,
					data: res
				}
			}).catch(err => {
				console.error(err)
				ctx.body = {
					code: 500,
					data: error
				}
			})
		}else{
			ctx.body = {
				code: 200,
				data: '用户不存在'
			}
		}
	}).catch(err => {
		console.error(err)
		ctx.body = {
			code: 500,
			data: err
		}
	})
})

// 模块公开的接口 ,在exports抛出接口
module.exports = router