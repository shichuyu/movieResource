const Router = require('koa-router');
const router = new Router();
// 引入制作好的控制器
const user_controller = require('../../app/controller/user_controller');

router.get('/', async(ctx) =>{
	ctx.body = '<h1>userRouter</h1>'
})

router.get('/get', user_controller.getTest);

module.exports = router