const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();
router.get('/', async(ctx) => {
	ctx.body = "首页"
})

// 导入首页数据到数据库
router.get('/addHome', async(ctx) => {
	try {
		fs.readFile('./datajson/home.json', 'utf8', (err, data) => {
			data = JSON.parse(data) // 转为json
			console.log(data);
			let saveCount = 0;
			// 引入model
			const Home = mongoose.model('Home')
			data.map((value, index) => {
				console.log(value);
				let newHome = new Home(value);
				newHome.save().then(() => {
					saveCount++;
					console.log('插入成功：' + saveCount)
				}).catch(err => {
					console.log('插入失败：' + err)
				})
			})
		})
		ctx.body = "开始导入home数据"
	} catch(e) {
		ctx.body = {
			code: 500,
			data: e
		}
		console.error(e);
	}
})

// 查询首页数据
router.get('/getHome', async(ctx) => {
	try {
		const Home = mongoose.model('Home');
		let result = await Home.find({}).exec()
		console.log('查询home数据成功：\n' + result)
		ctx.body = {
			code: 200,
			data: result,
		}
	} catch(e) {
		ctx.body = {
			code: 500,
			data: e
		}
		console.error(e);
	}
})

module.exports = router