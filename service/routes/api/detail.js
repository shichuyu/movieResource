const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();
router.get('/', async(ctx) => {
	ctx.body = "详细信息页"
})

// 获取电影详情信息的接口，根据ID去查询获取详情
router.post('/getDetailMovieInfo', async(ctx) => {
	try {
		let movieId = ctx.request.body.movieId
	} catch(e) {
		// statements
		console.log(e);
	}
})