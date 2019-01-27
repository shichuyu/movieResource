// 输出查看连接的端口号
const configFun = async(ctx, next) =>{
	console.log('[Server] starting at port 3000')
}

// 暴露端口
module.exports = {
	port: 3000, // 项目启动的端口
	db: 'mongodb://localhost:27017/movieResource', // 数据库
	saltTimes: 3, // 加盐的次数（即用户密码加密的次数）
	configFun: configFun
}

