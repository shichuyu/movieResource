const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
const Router = require('koa-router') // 注册中间件 使用路由操作
const bodyParser = require('koa-bodyparser') // 注册中间件koa-bodyparser
const cors = require('koa2-cors') // 注册中间件cors 让后台支持跨域

app.use(bodyParser()) // 引入中间件bodyParser
app.use(cors()) // 引入中间件cors

let test = require('./routes/api/test.js')
let home = require('./routes/api/home.js')
let user = require('./routes/api/user.js')

const userRouter = require('./routes/api/user_router')

// 装载所有路由
let router = new Router()
router.use('/test', test.routes())
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/userRouter', userRouter.routes())

// 加载路由中间件】
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行 
;(async () =>{
	await connect()
	initSchemas()
})()

app.use(async(ctx) => {
	ctx.body = '<h1>TYWD</h1>'
});

app.listen(3000, () => {
	console.log('[Server] starting at port 3000')
})