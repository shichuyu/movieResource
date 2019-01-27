const Koa = require('koa');
// 引入配置端口的文件
const config = require('./config'); 
// 数据库连接
const { connect } = require('./database/init.js'); 
// 处理使后台支持跨域
const cors = require('koa2-cors'); 

/*用来解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，在koa中
是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据。*/
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');
const Router = require('koa-router');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

const userRouter = require('./routes/api/user_router');

const router = new Router();
router.use('/userRouter', userRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

// 立即执行 
;(async () =>{
	await connect()
})()

app.use(async(ctx) => {
	ctx.body = '<h3>moiveResource</h3>'
})

app.listen(config.port, config.configFun)
